import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";

interface Props {
  id: string,
  depositTab: string,
  setDepositTab: Dispatch<SetStateAction<string>>,
}
const Tab: FunctionComponent<Props> = (props) => {
  const selected = props.depositTab === props.id;
  return (
    <Flex
      background={ selected ? '#CEBFBF' : 'none'}
      rounded={'10px'}
      w={'93px'}
      h={'100%'}
      justify={'center'}
      align={'center'}
      cursor={'pointer'}
      onClick={() => { props.setDepositTab(props.id) }}
    >
      <Text
        fontSize={'13px'}
        fontWeight={'860'}
        lineHeight={'16px'}
        color={selected? '#493C3C' : '#CEBFBF'}
      >
        {props.children}
      </Text>
    </Flex>
  );
}
export default Tab;