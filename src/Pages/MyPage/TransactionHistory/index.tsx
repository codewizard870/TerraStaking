import React, { FunctionComponent, useState, useEffect, useCallback, useMemo } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import * as nearAPI from "near-api-js"
import {getConfig} from "../../../config"

// import {  useInfiniteQuery } from "react-query"
import axios from "axios"

import { useWallet, useTerraAPIURL } from '../../../store';
import HistoryItem from './HistoryItem';


export interface AccountHistory {
  limit: number
  next: number
  list: AccountHistoryItem[]
}

export interface AccountHistoryItem {
  txhash: string
  timestamp: any
  success: boolean
  msgs?: TxMessage[]
  collapsed?: number
  fee: CoinData[]
  memo?: string
  raw_log?: string
}

export interface TxMessage {
  msgType: string
  canonicalMsg: string[]
}

export interface CoinData {
  amount: string
  denom: string
}
const nearConfig = getConfig("testnet");

const TransactionHistory: FunctionComponent = (props) => {
  const wallet = useWallet();
  const baseURL = useTerraAPIURL();
  
  useEffect( ()=> {
    const fetchTransaction = async () => {
      const near = await nearAPI.connect(
        Object.assign(
          { deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } },
          nearConfig)
      );

      // const blockInfoByHeight = await near.connection.provider.block({
      //   blockId: 0,
      // });
// console.log(blockInfoByHeight)
    }
    fetchTransaction();
  }, [] )

  return (
    <VStack
      w={'100%'}
      spacing={'18px'}
      mt='55px'
      align='baseline'
    >
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        TRANSACTION HISTORY
      </Text>
      <VStack 
        w={'100%'}
        rounded={'25px'} 
        background={'#212121'} 
        align={'center'}
        spacing={'34px'}
        px={{sm:'10px', md:'20px', lg:'50px'}}
        py={{sm:'10px', md:'20px', lg:'76px'}}
      >
        <VStack w={'100%'}>
          {/* {list.map((item, index) => (
            <HistoryItem item={item} key={index}/>
          ))} */}
        </VStack>
      </VStack>
    </VStack>
  );
}
export default TransactionHistory;
