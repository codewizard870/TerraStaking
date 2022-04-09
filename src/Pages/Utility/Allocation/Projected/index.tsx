import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import { MdInfoOutline } from 'react-icons/md';

import { OpenDepositModal, useStore } from '../../../../store';

const Projected: FunctionComponent = (props) => {
  return (
    <VStack w={'100%'} color={'#CEBFBF'} spacing={'20px'}>
      <HStack w={'100%'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          YOUR PROJECTED ALLOCATION VALUE
        </Text>
        <MdInfoOutline />
      </HStack>
      <HStack w={'100%'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          122,875 
        </Text>
        <Text
          fontSize={'25px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          UST
        </Text>
      </HStack>
    </VStack>
  );
}
export default Projected;