import React, { FunctionComponent } from 'react';
import { Stack, VStack, HStack, Flex, Button } from '@chakra-ui/react'

import Title from './Title'
import Total from './Total';
import USTDepositPanel from './USTDepositPanel';
import LUNADepositPanel from './LUNADepositPanel';
import Expected from './Expected';

const MyPage: FunctionComponent = (props) => {
  return (
    <VStack 
      mt={'15px'} 
      px={{sm:'10px', md:'20px', lg:'110px'}}
      w={'100%'}
      spacing={'53px'}
    >
      <Title />
      <Total />
      <HStack spacing={'56px'} w={'100%'}>
        <USTDepositPanel />
        <LUNADepositPanel />
      </HStack>
      <Expected />
    </VStack>
  );
}
export default MyPage;