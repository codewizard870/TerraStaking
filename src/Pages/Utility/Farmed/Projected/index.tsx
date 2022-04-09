import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Tooltip, Center, Divider, Button } from '@chakra-ui/react'

import Warning from '../../../../assets/Warning.svg'
import { OpenDepositModal, useStore } from '../../../../store';

const Projected: FunctionComponent = (props) => {
  return (
    <VStack w={'100%'} color={'#CEBFBF'} spacing={'12px'}>
      <HStack w={'100%'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          YOUR PROJECTED SHARE OF TerraT TOKENS
        </Text>
        <Tooltip 
          label="Your projected share with your current deposit value until the end of the farming event" 
          background={'#C4C4C4'} hasArrow 
          placement='top-start' 
          color={'black'}
        > 
          <Image src={Warning} w={'13px'}/>
        </Tooltip>
      </HStack>
      <HStack w={'100%'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          1,152,875.97 
        </Text>
        <Text
          fontSize={'25px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          TerraT
        </Text>
      </HStack>
    </VStack>
  );
}
export default Projected;