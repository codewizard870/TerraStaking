import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'

import TerraIcon from './../../../assets/Terra.svg'
import Warning from './../../../assets/Warning.svg'

import { OpenDepositModal, OpenWithdrawModal, useStore, useUSTApr } from '../../../store';

const USTDepositPanel: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const apr = useUSTApr();

  return (
    <VStack
      w={'100%'}
      rounded={'25px'}
      background={'#212121'}
      px={{ sm: '10px', md: '20px', lg: '47px' }}
      py={{ sm: '10px', md: '20px', lg: '55px' }}
    >
      <Image src={TerraIcon} w={'65px'} />
      <Text
        mt={'14px'}
        fontSize={'35px'}
        fontWeight={'860'}
        lineHeight={'36px'}
      >
        UST
      </Text>
      <HStack spacing={'39px'} pt={'44px'}>
        <Flex w={'93px'} h={'29px'} background={'#493C3C'} rounded={'15px'} justify={'center'} align={'center'}>
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
          >
            APR
          </Text>
        </Flex>
        <HStack spacing={'10px'}>
          <Text
            fontSize={'14px'}
            fontWeight={'860'}
            lineHeight={'36px'}
            fontStyle={'italic'}
          >
            {apr}%
          </Text>
          <Image src={Warning} w={'8px'} />
        </HStack>
      </HStack>
      <Divider pt={'44px'} orientation={'horizontal'} />
      <HStack
        w={'100%'}
        pt={'37px'}
        spacing={'24px'}
        justify={'center'}
      >
        <Button
          w={'200px'}
          h={'45px'}
          background={'#493C3C'}
          rounded={'25px'}
          onClick={() => OpenDepositModal(state, dispatch, "ust")}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}

          >
            Deposit
          </Text>
        </Button>
        <Button
          w={'200px'}
          h={'45px'}
          background={'black'}
          border={'solid 1px'}
          borderColor={'white'}
          rounded={'25px'}
          onClick={() => OpenWithdrawModal(state, dispatch, "ust")}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
          >
            Withdraw
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
}
export default USTDepositPanel;