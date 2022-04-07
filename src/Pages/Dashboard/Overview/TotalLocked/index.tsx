import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, Image, Link } from '@chakra-ui/react'
import {useStore} from '../../../../store';


const TotalLocked: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  const history = state.amountHistory;
console.log(history)  
  const last = history.length-1;
  const total = history[last].usd;

  return (
    <>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        TOTAL VALUE LOCKED
      </Text>
      <HStack spacing={'10px'} alignItems={'baseline'}>
        <Text
          fontSize={'34px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          {total.toLocaleString()}&nbsp;
        </Text>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          USD
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={'860'}
          lineHeight={'36px'}
          color={'green'}
        >
          ▲ 2%
        </Text>
      </HStack>
    </>
  );
}
export default TotalLocked;