import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Tooltip, Image, Center, Divider, Button } from '@chakra-ui/react'
import Warning from '../../../../assets/Warning.svg'

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
        <Tooltip 
          label="Your projected token share (x) the projected price" 
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