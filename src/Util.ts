import { AppContextInterface, ActionKind } from './store'
import { MsgExecuteContract, WasmAPI, Coin, LCDClient, Fee } from '@terra-money/terra.js'
import { ConnectedWallet } from '@terra-money/wallet-provider'
import { toast } from 'react-toastify';
import axios from 'axios';
import { successOption, errorOption, POOL } from './constants';
import { flattenTokens } from '@chakra-ui/react';

export function shortenAddress(address: string | undefined) {
  if (address) {
    let prefix = address.slice(0, 5);
    let suffix = address.slice(-5)
    return prefix + "..." + suffix;
  }
  return "";
}

function calcUSD(amountHistory: any, ustPrice: number, lunaPrice: number) {
  if (amountHistory == undefined) return undefined;

  for (let i = 0; i < amountHistory.length; i++) {
    amountHistory[i].ust_amount = Math.floor(parseInt(amountHistory[i].ust_amount) / (10 ** 5)) / 10;
    amountHistory[i].luna_amount = Math.floor(parseInt(amountHistory[i].luna_amount) / (10 ** 5)) / 10;
    amountHistory[i].usd =
      amountHistory[i].ust_amount * ustPrice + amountHistory[i].luna_amount * lunaPrice;
    amountHistory[i].totalUST = 
      amountHistory[i].ust_amount + amountHistory[i].luna_amount * lunaPrice / ustPrice;
  }

  return amountHistory;
}
export async function fetchData(state: AppContextInterface, dispatch: React.Dispatch<any>) {
  const wallet = state.wallet;
  const api = new WasmAPI(state.lcd.apiRequester);

  let amountHistory = undefined,
    aprUstHistory = undefined,
    aprLunaHistory = undefined,
    ustInfo = undefined,
    lunaInfo = undefined,
    userInfoUst = undefined,
    userInfoLuna = undefined

  try {
    amountHistory = await api.contractQuery(
      POOL,
      {
        get_amount_history: {}
      });
  } catch (e) { }

  try {
    aprUstHistory = await api.contractQuery(
      POOL,
      {
        get_history_of_apr_ust: {}
      }
    )
  } catch (e) { }

  try {
    aprLunaHistory = await api.contractQuery(
      POOL,
      {
        get_history_of_apr_luna: {}
      }
    )
  } catch (e) { }

  try {
    lunaInfo = await axios.get(
      `https://api.extraterrestrial.money/v1/api/prices?symbol=LUNA`
    );
  } catch (e) { }

  try {
    ustInfo = await axios.get(
      `https://api.extraterrestrial.money/v1/api/prices?symbol=UST`
    );
  } catch (e) { }

  try {
    userInfoUst = await api.contractQuery(
      POOL,
      {
        get_user_info_ust: {
          wallet: wallet?.walletAddress
        }
      }
    )
  } catch (e) { }
  try {
    userInfoLuna = await api.contractQuery(
      POOL,
      {
        get_user_info_luna: {
          wallet: wallet?.walletAddress
        }
      }
    )
  } catch (e) { }

  const ustPrice = ustInfo ? ustInfo?.data.prices.UST.price : state.ustPrice;
  const lunaPrice = lunaInfo ? lunaInfo?.data.prices.LUNA.price : state.lunaPrice;
  // let amountHistory, aprUstHistory, aprLunaHistory, ustPrice, lunaPrice, userInfoUst, userInfoLuna
  if (amountHistory !== undefined)
    dispatch({ type: ActionKind.setAmountHistory, payload: calcUSD(amountHistory, ustPrice, lunaPrice) });
  if (aprUstHistory !== undefined)
    dispatch({ type: ActionKind.setAprUstHistory, payload: aprUstHistory });
  if (aprLunaHistory !== undefined)
    dispatch({ type: ActionKind.setAprLunaHistory, payload: aprLunaHistory });
  if (ustPrice !== undefined)
    dispatch({ type: ActionKind.setUstPrice, payload: ustPrice });
  if (lunaPrice !== undefined)
    dispatch({ type: ActionKind.setLunaPrice, payload: lunaPrice });
  if (userInfoUst !== undefined)
    dispatch({ type: ActionKind.setUserInfoUst, payload: userInfoUst });
  if (userInfoLuna !== undefined)
    dispatch({ type: ActionKind.setUserInfoLuna, payload: userInfoLuna });
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function estimateSend(
  wallet: ConnectedWallet,
  lcd: LCDClient,
  msgs: MsgExecuteContract[],
  message: string,
  memo: string) {
  console.log(msgs);
  const obj = new Fee(10_000, { uusd: 4500 })

  let accountInfo: any | undefined = undefined;

  await lcd.auth.accountInfo(
    wallet.walletAddress
  )
    .then((e) => {
      accountInfo = e;
    })
    .catch((e) => {
      toast(e.message, errorOption)
      console.log(e.message);
    })
  console.log(accountInfo);
  if (!accountInfo)
    return false;

  let txOptions =
  {
    msgs: msgs,
    memo: memo,
    gasPrices: obj.gasPrices(),
    gasAdjustment: 1.7,
  };

  let rawFee: any | undefined = undefined;
  await lcd.tx.estimateFee(
    [
      {
        sequenceNumber: accountInfo.getSequenceNumber(),
        publicKey: accountInfo.getPublicKey(),
      },
    ],
    txOptions
  )
    .then((e) => {
      rawFee = e;
    })
    .catch((e) => {
      toast(e.message, errorOption)
      console.log(e.message);
    })

  if (!rawFee)
    return false;

  return await wallet
    .post({
      msgs: msgs,
      memo: memo,
      fee: rawFee,
      gasPrices: obj.gasPrices(),
      gasAdjustment: 1.7,
    })
    .then(async (e) => {
      if (e.success) {
        toast("Successs! Please wait", successOption);
      } else {
        toast(e.result.raw_log, errorOption);
        console.log(e.result.raw_log);
        return false;
      }

      let count = 10;
      let height = 0;
      while (count > 0) {
        await lcd.tx.txInfo(e.result.txhash)
          // eslint-disable-next-line no-loop-func
          .then((e) => {
            console.log(e)
            if (e.height > 0) {
              toast.dismiss();
              toast(message, successOption);
              height = e.height;
            }
          })
          .catch((e) => {
            // console.log(e)
          })
        if (height > 0) break;

        await sleep(1000);

        count--;
        console.log(count);
      }

      return true;
    })
    .catch((e) => {
      toast(e.message, errorOption);
      console.log(e.message);
      return false;
    })
}

export function checkNetwork( wallet: ConnectedWallet | undefined, state: AppContextInterface) {
  //----------verify connection--------------------------------
  if (wallet === undefined) {
    toast("Please connect wallet first!", errorOption);
    console.log("Please connect wallet first!");
    return false;
  }
  else {
    toast.dismiss();
  }

  if (state.net == 'mainnet' && wallet.network.name == 'testnet') {
    toast("Please switch to mainnet!", errorOption);
    return false;
  }
  if (state.net == 'testnet' && wallet.network.name == 'mainnet') {
    toast("Please switch to Testnet!", errorOption);
    return false;
  }
  return true;
}