import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectDepositTab,
  appSlice,
} from '../../../app/appSlice';
import Tab from './Tab';

const DepositTab: FunctionComponent = (props) => {
  const depositTab = useAppSelector(selectDepositTab);
  const dispatch = useAppDispatch();
  return (
    <HStack 
      w={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      align={'center'}
      spacing={'34px'}
      height={'52px'}
    >
      <Tab id='all'>ALL</Tab>
      <Tab id='ust'>UST</Tab>
      <Tab id='luna'>LUNA</Tab>
    </HStack>
  );
}
export default DepositTab;