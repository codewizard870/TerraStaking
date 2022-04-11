import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Tooltip, Button } from '@chakra-ui/react'
import Warning from "./../../../assets/Warning.svg"

import { OpenDepositModal, useStore, useExchangeRate, useUSTPrice } from '../../../store';

const TotalPayed: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const ustRewards = state.userInfoUst.reward_amount;
  const lunaRewards = state.userInfoLuna.reward_amount;
  const exchangeRate = useExchangeRate();
  const rewards = Math.floor(ustRewards / 10 ** 6 + (lunaRewards * exchangeRate) / 10 ** 6);

  const depositTime_max = Math.max(state.userInfoUst.deposit_time, state.userInfoLuna.deposit_time);
  const depositTime_min = Math.min(state.userInfoUst.deposit_time, state.userInfoLuna.deposit_time);
  const depositTime = depositTime_min === 0 ? depositTime_max : depositTime_min
  const period = depositTime > 0 ? Date.now() - depositTime * 1000 : 0;
  const day = Math.floor(period / 1000 / 60 / 60 / 24);

  const ustPrice = useUSTPrice();
  return (
    <Flex
      direction={'column'}
      w={'100%'}
      rounded={'25px'}
      background={'#212121'}
      align={'baseline'}
      p={{ sm: '10px', md: '20px', lg: '59px' }}
    >
      <Tooltip
        label="Total payed interest of your UST/Luna Deposits calculated in UST"
        background={'#C4C4C4'}
        color={'black'} hasArrow
        placement='top-start'
      >
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          TOTAL PAYED INTEREST
        </Text>
      </Tooltip>
      <HStack mt={'6px'} spacing={'10px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          {rewards.toLocaleString()}
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
        USD ${ustPrice}
      </Text>
      <HStack mt={'31px'} spacing={'20px'} align={'baseline'}>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          TOTAL DAYS STAKED
        </Text>
        <Tooltip
          label="Total days staked with no withdraw"
          background={'#C4C4C4'} hasArrow
          placement='top-start'
          color={'black'}
        >
          <Image src={Warning} w={'13px'} />
        </Tooltip>
      </HStack>
      <HStack mt={'10px'} spacing={'10px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          {day}
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
        onClick={() => OpenDepositModal(state, dispatch, "ust")}
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