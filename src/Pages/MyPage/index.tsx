import React, { FunctionComponent, useMemo, useState } from 'react';
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
      {(depositTab === 'all' || depositTab === 'ust') &&
        <USTDepositPanel />
      }
      {(depositTab === 'all' || depositTab === 'luna') && 
        <LUNADepositPanel />
      }

      <TransactionHistory />
    </VStack>
  );
}
export default MyPage;

