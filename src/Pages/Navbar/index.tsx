import React, { FunctionComponent } from 'react';
import { HStack, Flex, Button } from '@chakra-ui/react'

import Tab from './Tab'
import ConnectWallet from './ConnectWallet';

const Navbar: FunctionComponent = (props) => {
  return (
    <Flex
      direction={'row'}
      ml={'109px'}
      mt={'50px'}
      mb={'50px'}
      w={'100%'}
      justify={'space-between'}
      align={'center'}
    >
      <HStack spacing={'10px'} >
        <Tab id={'dashboard'} >Dashboard</Tab>
        <Tab id={'mypage'} >My Page</Tab>
        <Tab id={'earn'} >Earn</Tab>
        <Tab id={'utility'} >Utility</Tab>
      </HStack>
      <ConnectWallet />
    </Flex>
  );
}
export default Navbar;