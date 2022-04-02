import React, { FunctionComponent } from 'react';
import { Stack, Flex } from '@chakra-ui/react'

import Tab from './Tab'
import ConnectWallet from './ConnectWallet';

const Navbar: FunctionComponent = (props) => {
  return (
    <Flex
      direction={'row'}
      px={{ sm: '10px', md:'20px', lg: '109px' }}
      // mr={{sm:'10px', md:'20px', lg:'110px'}}
      mt={'50px'}
      mb={'50px'}
      w={'100%'}
      justify={'space-between'}
      align={'center'}
    >
      <Stack
        direction={{ sm: 'column', md:'row', lg: 'row' }}
        spacing={'10px'}
      >
        <Tab id={'dashboard'} >Dashboard</Tab>
        <Tab id={'mypage'} >My Page</Tab>
        <Tab id={'earn'} >Earn</Tab>
        <Tab id={'utility'} >Utility</Tab>
      </Stack>
      <ConnectWallet />
    </Flex>
  );
}
export default Navbar;