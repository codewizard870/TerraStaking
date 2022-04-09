import React, { FunctionComponent } from 'react';
import { HStack, Stack, VStack, Flex, Text, Image, Link, Center, Divider, Tooltip } from '@chakra-ui/react'
import TVLChart from './TVLChart';

const TVL: FunctionComponent = (props) => {
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
            525,859,532,875
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