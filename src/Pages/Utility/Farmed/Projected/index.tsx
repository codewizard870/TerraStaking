import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Tooltip, Center, Divider, Button } from '@chakra-ui/react'

import Warning from '../../../../assets/Warning.svg'
import { OpenDepositModal, useStore, useUSTDeposited, useLUNADeposited, useUSTPrice, useLUNAPrice } from '../../../../store';

const Projected: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const ustDeposited = useUSTDeposited();
  const lunaDeposited = useLUNADeposited();
  const ustPrice = useUSTPrice();
  const lunaPrice = useLUNAPrice();
  const total = ustPrice * ustDeposited + lunaDeposited * lunaPrice;
  const dayReward = total / 1000 * 24;

  const remain = 60 - Math.floor((Date.now() / 1000 - state.farmStartTime) / 60 / 60 / 24);

  const expected = Math.floor(dayReward * remain);

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
          <Image src={Warning} w={'13px'} />
        </Tooltip>
      </HStack>
      <HStack w={'100%'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          {expected.toLocaleString()}
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