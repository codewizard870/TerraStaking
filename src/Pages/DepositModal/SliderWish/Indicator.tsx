import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Box, Flex, Text } from '@chakra-ui/react'

const Indicator: FunctionComponent = (props) => {
  return (
    <Flex 
      w={'100%'}
      h={'100%'}
      border={'solid 1px white'} 
      borderWidth={'0px 1px 0px 0px'} 
      justify={"end"}      
    >
      <Text
        fontSize={'8px'}
        fontWeight={'860'}
        lineHeight={'10px'}
        color={'#CEC0C0'}
      >
        {props.children}
      </Text>
    </Flex>
  );
}
export default Indicator;