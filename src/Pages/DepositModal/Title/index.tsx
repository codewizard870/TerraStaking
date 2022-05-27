import React, { FunctionComponent, useState } from 'react';
import { VStack, HStack, Flex, Image, Text} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";

import {COINTYPE, useStore} from '../../../store'
import {getCoinParam} from '../../../Util';


interface Props {
}

const Title: FunctionComponent<Props> = (props) => {
  const {state, dispatch} = useStore();
  const item = getCoinParam(state.coinType);

  return (
    <Flex
      direction="row" 
      align={'center'}
      height={'29px'}
    >
      <Image src={'./' + item?.avatar} w='33px'/>
      <Flex direction='column' ml='18px'>
        <Text
          fontSize='20px'
          fontWeight={'800'}
          color='white'
          lineHeight={'20px'}
        >
          {item?.name}
        </Text>
        <Text
          fontSize='13px'
          fontWeight={'400'}
          color='#CEC0C0'
          whiteSpace={'nowrap'}
          lineHeight='13px'
        >
          {item?.description}
        </Text>
      </Flex>
    </Flex>
  );
}
export default Title;