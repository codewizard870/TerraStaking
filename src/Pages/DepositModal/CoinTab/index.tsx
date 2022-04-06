import React, { FunctionComponent, useState } from 'react';
import { VStack, HStack, Flex} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";

import Tab from './Tab';

interface Props {
  coin: string,
  setCoin: Dispatch<SetStateAction<string>>,
}
const CoinTab: FunctionComponent<Props> = ({coin, setCoin}) => {

  return (
    <Flex
      direction="row" 
      rounded={'10px'} 
      background={'#493C3C'} 
      align={'center'}
      height={'29px'}
    >
      <Tab id='ust' depositTab={coin} setDepositTab={setCoin}>UST</Tab>
      <Tab id='luna' depositTab={coin} setDepositTab={setCoin}>LUNA</Tab>
    </Flex>
  );
}
export default CoinTab;