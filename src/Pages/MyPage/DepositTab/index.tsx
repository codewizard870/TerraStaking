import React, { FunctionComponent, useState } from 'react';
import { VStack, HStack} from '@chakra-ui/react'

import Tab from './Tab';

const DepositTab: FunctionComponent = (props) => {
  const [depositTab, setDepositTab] = useState('all');
  return (
    <HStack 
      w={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      align={'center'}
      spacing={'-10px'}
      height={'52px'}
    >
      <Tab id='all' depositTab={depositTab} setDepositTab={setDepositTab}>ALL</Tab>
      <Tab id='ust' depositTab={depositTab} setDepositTab={setDepositTab}>UST</Tab>
      <Tab id='luna' depositTab={depositTab} setDepositTab={setDepositTab}>LUNA</Tab>
    </HStack>
  );
}
export default DepositTab;