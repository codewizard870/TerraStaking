import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Input, Link, Center, Divider, Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";

interface Props {
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
  coin: string,
}
const InputPanel: FunctionComponent<Props> = (props) => {
  
  return (
    <VStack w={'100%'} spacing={'6px'}>
      <Flex
        background={ '#493C3C'}
        rounded={'10px'}
        w={'100%'}
        h={'45px'}
        px={'20px'}
        mt={'27px'}
        align={'center'}
        justify={'space-between'}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
          color={'#CEC0C0'}
        >
          AMOUNT
        </Text>
        <Input 
          width={'100%'} 
          textAlign={'right'} 
          color={'white'}
          border={'none'}
          _focus={{border: 'none'}}
        />
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
          color={'white'}
        >
          {props.coin.toUpperCase()}
        </Text>
      </Flex>
      <Flex
        justify={'flex-end'}
        w={'100%'}
      >
        <Text
          fontSize={'9px'}
          fontWeight={'860'}
          lineHeight={'11px'}
          color={'#CEC0C0'}
        >
          `MAX balance  UST`
        </Text>
      </Flex>
    </VStack>
  );
}
export default InputPanel;