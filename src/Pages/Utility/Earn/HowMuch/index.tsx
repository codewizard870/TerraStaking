import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import { MdInfoOutline } from 'react-icons/md';

import { OpenDepositModal, useStore } from '../../../../store';

const HowMuch: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  
  return (
    <Flex w={'100%'} direction="column" align={'baseline'}>
      <HStack>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          HOW MUCH TerraT CAN I EARN?
        </Text>
        <MdInfoOutline />
      </HStack>
      <Button 
        w={'350px'} 
        mt={'40px'} 
        h={'45px'} 
        background={'#493C3C'} 
        rounded={'25px'}
        onClick = {() => OpenDepositModal(state, dispatch, "ust")}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
        >
          STAKE NOW & GET FREE TerraT 
        </Text>
      </Button>
    </Flex>
);
}
export default HowMuch;