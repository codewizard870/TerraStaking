import React, { FunctionComponent, useState } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'

import { OpenDepositModal, useStore } from '../../../store';
import HowMuch from './HowMuch';
import Deposited from './Deposited';
import { MdCached } from 'react-icons/md';
import Expected from './Expected';

const Earn: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const [amount, setAmount] = useState('10000');
  return (
    <Stack
      direction={{ sm: 'column', md: 'column', lg: 'row' }}
      w={'100%'}
      rounded={'25px'}
      background={'#212121'}
      px={{ sm: '10px', md: '20px', lg: '59px' }}
      py={{ sm: '25px', md: '20px', lg: '59px' }}
      spacing={{sm:'10px', md: '20px', lg:'55px'}}
    >
      <HowMuch />
      <HStack 
        w='100%' 
        spacing={{base:'10px', lg:'50px'}}
        align='center'
      >
        <Deposited amount={amount} setAmount={setAmount}/>
        <Flex w={'24px'} >
          <MdCached size={24}/>
        </Flex>
        <Expected amount={amount}/>
      </HStack>
    </Stack>
  );
}
export default Earn;