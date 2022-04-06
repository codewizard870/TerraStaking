import React, { FunctionComponent, useState, useMemo, useEffect } from 'react';
import { Flex, Text, Button, Image } from '@chakra-ui/react'
import { useWallet, useConnectedWallet } from '@terra-money/wallet-provider'
import { LCDClient, WasmAPI, Coins, Coin } from '@terra-money/terra.js'
import { toast } from 'react-toastify';
import {MdOutlineAccountBalanceWallet} from 'react-icons/md'

import Wallet from './../../../assets/Wallet.svg';
import { useStore, ActionKind } from '../../../store';
import { shortenAddress } from '../../../Util';


const ConnectWallet: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  let wallet = useWallet()
  let connectedWallet = useConnectedWallet()

  const lcd = useMemo(() => {
    if (!connectedWallet) {
      dispatch({ type: ActionKind.setConnected, payload: false });
      dispatch({ type: ActionKind.setWallet, payload: undefined });

      return undefined;
    }
    dispatch({ type: ActionKind.setConnected, payload: true });
    dispatch({ type: ActionKind.setWallet, payload: connectedWallet });
    
    let lcd =  new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    })
    dispatch({ type: ActionKind.setLcd, payload: lcd });

    return lcd;
  }, [connectedWallet, dispatch])

  useEffect(() => {
    async function fetchBalance() {
      if (connectedWallet?.walletAddress && lcd) {
        let coins: Coins;
        try {
          [coins,] = await lcd.bank.balance(connectedWallet.walletAddress);
        } catch (e) {
          toast("Can't fetch Wallet balance");
          return;
        }
        if (coins.get('uusd')) {
          dispatch({type: ActionKind.setUusdBalance, payload: coins.get('uusd')?.amount.toNumber()});
        }
        if (coins.get('uluna')) {
          dispatch({type: ActionKind.setUlunaBalance, payload: coins.get('uluna')?.amount.toNumber()});
        }
      }
    }

    if (connectedWallet && lcd) {
      fetchBalance()
    }
  }, [connectedWallet, lcd, dispatch])

  function connectTo(to: string) {
    console.log(wallet)
    if (to === 'extension') {
      wallet.connect(wallet.availableConnectTypes[0])
    } else if (to === 'mobile') {
      wallet.connect(wallet.availableConnectTypes[1])
    } else if (to === 'disconnect') {
      wallet.disconnect()
      // dispatch({ type: 'setWallet', message: {} })
    }
  }

  return (
    <Button
      fontSize={'15px'}
      fontWeight={'700'}
      width={'171px'}
      height={'36px'}
      background={'none'}
      border={'solid 2px #F9D85E'}
      rounded={'25px'}
      onClick={() => { connectTo('extension') }}
    >
      {!state.connected && 
        <>
        <Image src={Wallet} width={'15px'} />
        <Text ml={'11px'} color={'#F9D85E'}>
          Connect Wallet
        </Text>
        </>
      }
      {state.connected &&
        <>
          <MdOutlineAccountBalanceWallet size={25} color={'#F9D85E'}/>
          <Text ml={'15px'} color={'#F9D85E'}>
            {shortenAddress(connectedWallet?.walletAddress.toString())}
          </Text>
        </>
      } 
    </Button>
  );
}

export default ConnectWallet;