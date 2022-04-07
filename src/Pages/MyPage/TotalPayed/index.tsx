import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'

import {MdInfo, MdSwapHoriz} from 'react-icons/md'
import { OpenDepositModal, useStore } from '../../../store';

const TotalPayed: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  return (
    <Flex
      direction={'column'} 
      w={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      align={'baseline'}
      p={{sm:'10px', md:'20px', lg:'59px'}}
    >
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        TOTAL PAYED INTEREST
      </Text>
      <HStack mt={'6px'} spacing={'10px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          93,332.75
        </Text>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          UST
        </Text>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        lineHeight={'36px'}
        fontStyle={'italic'}
      >
        USD $1.75 
      </Text>
      <HStack mt={'31px'} spacing={'20px'} align={'baseline'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          TOTAL DAYS STAKED
        </Text>
        <MdInfo size={'13'}/>
      </HStack>
      <HStack mt={'10px'} spacing={'10px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          17
        </Text>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          DAYS
        </Text>
      </HStack>
      <Button 
        w={'100%'} 
        mt={'99px'} 
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
          STAKE MORE
        </Text>
      </Button>
    </Flex>
  );
}
export default TotalPayed;