import { readFileSync } from "fs";

import {
  LCDClient,
  MnemonicKey,
  MsgInstantiateContract,
  MsgStoreCode,
  MsgExecuteContract,
  Fee
} from "@terra-money/terra.js";


const POOL_PATH =
  "../Pool.wasm";

// Get the wallet seed phrase from the environment variable.
const TERRA_SEED = process.env.TERRA_SEED
const mk = new MnemonicKey({
  mnemonic:
    TERRA_SEED,
});

const LCD_TEST = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12',
  gasPrices: { uusd: 0.45 },
});
const LCD_MAIN = new LCDClient({ //mainnet
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-5',
  gasPrices: { uusd: 0.45 },
});

const net = "test"
let terra = net=="main"? LCD_MAIN : LCD_TEST;
const codeid_cw20 = net=="main"? 3: 148;

let wallet = terra.wallet(mk);

let poolAddress = "terra1xmgtu0vp3fngfajk3mzg8tzraajy0vcsa8gy5v";
let vustAddress = "terra160zzh2fr7fwmyk3ullt5sj33aw2leejxcrvwjm";
let vlunaAddress = "terra1h9ua8n9z9v70vt8hc527rhvjmzmp0az8pdsg5j";

run();

async function run() {
  if (poolAddress == "") {
    console.log("Deploying Pool Contract");
    const poolCodeId = await upload(POOL_PATH);
    await sleep(12000);
    console.log("instatiating pool contract");

    let param = {
      "treasury": "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77",
      "ust_apr": "3487",
      "luna_apr": "1861",
      "vust": `${mk.accAddress}`,
      "vluna": `${mk.accAddress}`
    };
    poolAddress = await instantiate(poolCodeId, param);
    console.log(poolAddress);
    await sleep(12000);
  }

  if (vustAddress == "") {
    console.log("Deploying UST Voucher Contract");
    vustAddress = await instantiate(codeid_cw20, 
      {
      "name": "VUST",
      "symbol": "vust",
      "decimals": 6,
      "initial_balances": [],
      "mint":{
          "minter": `${poolAddress}`
        }
      }
    )
    console.log(vustAddress);
    await sleep(12000);
  }
  if (vlunaAddress == "") {
    console.log("Deploying LUNA Voucher Contract");
    vlunaAddress = await instantiate(codeid_cw20, 
      {
      "name": "VLUNA",
      "symbol": "vluna",
      "decimals": 6,
      "initial_balances": [],
      "mint":{
          "minter": `${poolAddress}`
        }
      }
    )
    console.log(vlunaAddress);
    await sleep(12000);
  }
  
  console.log("configuring");
  let result = await config();

  console.log("reading contract");
  result = await terra.wasm.contractQuery(poolAddress, { "get_history_of_apr_ust": {} })
  console.log(result);
}

async function config() {
  console.log("pool_contract: " + poolAddress);
  console.log("VUst: " + vustAddress);
  console.log("VLuna: " + vlunaAddress);
  
  try {
    // console.log("minting")
    // let mint_msg = new MsgExecuteContract(
    //   mk.accAddress,
    //   vustAddress,
    //   {
    //     "mint": {
    //         "recipient": "terra1r56xzdvxjjeqvkpk3879wv9zxy55cjnchqueg8",
    //         "amount": "123123000000"
    //     }
    //   }
    // );
    // let res = await EstimateSend([mint_msg], "setting apr");
    // await sleep(12000);

    console.log("adding apr")
    let apr_ust_config = new MsgExecuteContract(
      mk.accAddress,
      poolAddress,
      { "set_apr_ust": { "apr": "3487" } }
    );

    let apr_luna_config = new MsgExecuteContract(
      mk.accAddress,
      poolAddress,
      { "set_apr_luna": { "apr": "1861" } }
    );

    let token_address = new MsgExecuteContract(
      mk.accAddress,
      poolAddress,
      {
        "set_config":{
          "vust" : `${vustAddress}`,
          "vluna": `${vlunaAddress}`
        }
      }
    )
    let res = await EstimateSend([apr_ust_config, apr_luna_config, token_address], "setting apr");
    // console.log(res.raw_log);
  }
  catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

async function upload(contractPath) {
  const wasm = readFileSync(contractPath);
  const tx = new MsgStoreCode(mk.accAddress, wasm.toString("base64"));
  try {
    const storeResult = await EstimateSend([tx], `Storing ${contractPath}`);
    console.log(storeResult.raw_log);

    const codeId = extractCodeId(storeResult.raw_log);
    return codeId;
  } catch (error) {
    console.error("Error:" + error);
    process.exit(1);
  }
}

async function instantiate(codeId, instantiateMsg) {
  try {
    const instantiate = new MsgInstantiateContract(
      mk.accAddress,
      mk.accAddress,
      codeId,
      instantiateMsg
    );
    const instantiateResult = await EstimateSend([instantiate], "instantiating");
    return extractContractAddress(instantiateResult.raw_log);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function extractCodeId(logs) {
  // TODO improve parsing
  const parsed = JSON.parse(logs);
  return Number(parsed[0]["events"][1]["attributes"][1]["value"]);
}

function extractContractAddress(logs) {
  const parsed = JSON.parse(logs);
  let keys = parsed[0]["events"][0]["attributes"];
  for(let i=0; i<keys.length; i++){
    if(keys[i].key === 'contract_address')
      return keys[i].value;
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function EstimateSend(msgs, memo) {
  try {
    // const obj = new Fee(10_000, { uusd: 4500 });
    // console.log(obj.gasPrices);
    // let accountInfo;
// console.log(msgs);

    // await terra.auth.accountInfo(
    //   mk.accAddress
    // )
    // .then((e) => {
    //   accountInfo = e;
    // })
// console.log(accountInfo);

    // let txOptions =
    // {
    //   msgs: msgs,
    //   memo: memo,
    //   gasPrices: obj.gasPrices(),
    //   gasAdjustment: 1.7,
    // };

    // let rawFee;
    // await terra.tx.estimateFee(
    //   [
    //     {
    //       sequenceNumber: accountInfo.getSequenceNumber(),
    //       publicKey: accountInfo.getPublicKey(),
    //     },
    //   ],
    //   txOptions
    // )
    // .then((e) => {
    //   rawFee = e;
    // })
// console.log(rawFee);

    const res = await wallet
      .createAndSignTx({
        msgs: msgs,
        memo: memo,
        // fee: rawFee,
        // gasPrice: obj.gasPrices(),
        // gasAdjustment: 1.7
      })
      .then((tx) => terra.tx.broadcast(tx))

    return res;
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}
export default {};