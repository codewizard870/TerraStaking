import React, { FunctionComponent, useMemo, useState } from 'react';
import { Stack, VStack, Flex, HStack, Button } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider, useInfiniteQuery } from "react-query"
import { useLCD, useWallet, useTerraAPIURL, useStore, useNetworkName, COINTYPE } from '../../store';

import Title from './Title'
import TotalValue from './TotalValue';
import TotalPayed from './TotalPayed';
import DepositTab from './DepositTab';
import CoinPanel from './CoinPanel';
import TransactionHistory from './TransactionHistory';
import { StableCoins } from '../../constants';

const MyPage: FunctionComponent = (props) => {
  const [depositTab, setDepositTab] = useState('all');

  return (
    <VStack 
      mt={'15px'} 
      px={{sm:'10px', md:'20px', lg:'110px'}}
      w={'100%'}
      spacing={'53px'}
    >
      <Title />
      <Stack 
        mt={'53px'} 
        direction={{sm: 'column', md:'column', lg:'row'}}
        spacing={'55px'}
        w={'100%'}
      >
        <TotalValue />
        <TotalPayed />
      </Stack>
      <DepositTab depositTab={depositTab} setDepositTab={setDepositTab}/>
      <Flex flexWrap={'wrap'} justify='space-between'>
        {StableCoins.map((item) => (
            <CoinPanel 
              name = {item.name as COINTYPE}
              description = {item.description}
              avatar = {item.avatar}
              apr = {item.apr}
            />
          ))
        }
      </Flex>
      <TransactionHistory />
    </VStack>
  );
}
export default MyPage;

