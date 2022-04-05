import React, { FunctionComponent, useMemo } from 'react';
import { Stack, VStack, Flex, Button } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider, useInfiniteQuery } from "react-query"
import { useLCD, useWallet, useTerraAPIURL, useStore, useNetworkName } from '../../store';

import Title from './Title'
import TotalValue from './TotalValue';
import TotalPayed from './TotalPayed';
import DepositTab from './DepositTab';
import USTDepositPanel from './USTDepositPanel';
import LUNADepositPanel from './LUNADepositPanel';
import TransactionHistory from './TransactionHistory';

const MyPage: FunctionComponent = (props) => {
  const networkName = useNetworkName();
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient} key={networkName}>
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
          spacing={'56px'}
          w={'100%'}
        >
          <TotalValue />
          <TotalPayed />
        </Stack>
        <DepositTab />
        <USTDepositPanel />
        <LUNADepositPanel />

        <TransactionHistory />
      </VStack>
    </QueryClientProvider>
  );
}
export default MyPage;

const useQueryClient = () => {
  const name = useNetworkName()

  return useMemo(() => {
    if (!name) throw new Error()
    return new QueryClient()
  }, [name])
}
