import React, { FunctionComponent } from 'react';
import { VStack, Stack } from '@chakra-ui/react'

import CircularView from './CircularView';
import {MdInfo, MdSwapHoriz} from 'react-icons/md'
import Total from './Total';
import Seperator from './Seperator';

const TotalValue: FunctionComponent = (props) => {
  return (
    <VStack 
      w={{sm: '100%', md: '100%', lg:'682px'}}
      minWidth={{sm: '0px', md: '0px', lg:'682px'}}
      rounded={'25px'} 
      background={'#212121'} 
      align={'center'}
      spacing={'34px'}
      p={{sm:'10px', md:'20px', lg:'59px'}}
    >
      <Total />
      <Stack 
        w={'100%'}
        direction={{sm: 'column', md:'column', lg:'row'}}
        align={'center'}
      >
        <Seperator />
        <CircularView />
      </Stack>
    </VStack>
  );
}
export default TotalValue;