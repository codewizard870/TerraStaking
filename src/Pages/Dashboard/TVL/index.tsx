import React, { FunctionComponent } from 'react';
import { HStack, Stack, VStack, Flex, Text, Image, Link, Center, Divider, Tooltip } from '@chakra-ui/react'
import TVLChart from './TVLChart';
import { useStore
 } from '../../../store';
const TVL: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  const data = state.amountHistory;

  const last = data.length - 1;
  const total = Math.floor(last >= 0 ? data[last].totalUST ?? 0 : 0);

  return (
    <Flex 
      pt={'52px'} 
      w={'100%'}
      h={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      p={{sm:'10px', md:'20px', lg:'59px'}}
      align={'baseline'}
    >
      <VStack
        position={"absolute"}
        align={'baseline'}
      >
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          TVL OF THE ENTIRE ECOSYSTEM 
        </Text>
        <HStack spacing={'5px'} align={'baseline'}>
          <Text
            fontSize={'35px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            {total.toLocaleString()}
          </Text>
          <Text
            fontSize={'15px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            UST
          </Text>
        </HStack>
      </VStack>
      <TVLChart />
    </Flex>
  );
}
export default TVL;