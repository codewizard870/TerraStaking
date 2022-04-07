import React, { FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Link } from '@chakra-ui/react'

import BlackPanel from './../../../../assets/BlackPanel.svg'
import YellowPanel from './../../../../assets/YellowPanel.svg'
import { useStore } from '../../../../store';

const ValueView: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  const history = state.amountHistory;
  const last = history.length-1;
  const ustAmount = history[last].ust_amount;
  const lunaAmount = history[last].luna_amount;
  
  return (
    <VStack mt='28px' spacing={'14px'}>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          <Image src={YellowPanel} w={'15px'} />
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'24px'}
          >
            LUNA
          </Text>
        </HStack>
        <Text
          fontSize={'14px'}
          fontWeight={'400'}
          lineHeight={'36px'}
        >
          $&nbsp;{lunaAmount.toLocaleString()}
        </Text>
      </VStack>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          <Image src={BlackPanel} w={'15px'} />
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'24px'}
          >
            UST
          </Text>
        </HStack>
        <Text
          fontSize={'14px'}
          fontWeight={'400'}
          lineHeight={'36px'}
        >
          $&nbsp;{ustAmount.toLocaleString()}
        </Text>
      </VStack>
    </VStack>
  );
}
export default ValueView;