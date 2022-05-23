import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import { Grid, GridItem, Tooltip } from '@chakra-ui/react'

import {
  OpenDepositModal,
  OpenWithdrawModal,
  useStore,
  useLUNAApr,
  useLUNADeposited,
  useExchangeRate,
  COINTYPE
} from '../../../store';
import AnimationNumber from '../../Components/AnimationNumber';
import { floor, floorNormalize } from '../../../Util';

interface Props{
  name: COINTYPE,
  description: string,
  avatar: string,
  apr: number,
  tvl_coin: number,
  tvl_usd: number
}
const CoinItem: FunctionComponent<Props> = ({name, description, avatar, apr, tvl_coin, tvl_usd}) => {
  const { state, dispatch } = useStore();

  return (
    <>
      <GridItem w={'100%'} h={'100px'}>
        <HStack
          w={'100%'}
          h={'100%'}
          spacing={'27px'}
          align={'center'}
          justify={'left'}
          display={{ sm: 'none', md: 'none', lg: 'flex' }}
        >
          <Flex w='50px'>
            <Image src={'./' + avatar} w={'50px'} />
          </Flex>
          <VStack align={'baseline'} spacing={'0px'}>
            <Text
              fontSize={'20px'}
              fontWeight={'800'}
              lineHeight={'36px'}
              color={'white'}
            >
              {name}
            </Text>
            <Text
              fontSize={'13px'}
              fontWeight={'400'}
              lineHeight={'15.6px'}
            >
              {description}
            </Text>
          </VStack>
        </HStack>
      </GridItem>
      <GridItem w={'100%'} h={'100px'}>
        <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
          <Text
            fontSize={'13px'}
            fontWeight={'400'}
            lineHeight={'15.6px'}
          >
            <AnimationNumber value={apr} />%
          </Text>
        </Flex>
      </GridItem>
      <GridItem w={'100%'} h={'100px'}>
        <VStack w={'100%'} h={'100%'} align={'center'} justify={'center'} >
          <Text
            fontSize={'13px'}
            fontWeight={'400'}
            lineHeight={'15.6px'}
          >
            <AnimationNumber value={tvl_coin} /> {name}
          </Text>
          <Text
            fontSize={'13px'}
            fontWeight={'400'}
            lineHeight={'15.6px'}
          >
            <AnimationNumber value={tvl_usd} /> USD Value
          </Text>
        </VStack>
      </GridItem>
      <GridItem w={'100%'} h={'100px'}>
        <Stack
          direction={{ sm: 'column', md: 'column', lg: 'row' }}
          w={'100%'}
          h={'100%'}
          align={'center'}
          justify={'center'}
          spacing={'15px'}
        >
          <Button
            w={'92px'}
            h={'25px'}
            background={'#493C3C'}
            rounded={'25px'}
            onClick={() => OpenDepositModal(state, dispatch, name)}
          >
            <Text
              fontSize={'9px'}
              fontWeight={'800'}
              lineHeight={'10.8px'}
              color={'white'}
            >
              Deposit
            </Text>
          </Button>
          <Button
            w={'92px'}
            h={'25px'}
            background={'#212121'}
            rounded={'25px'}
            border={'solid 1px #CEBFBF'}
            onClick={() => OpenWithdrawModal(state, dispatch, name)}
          >
            <Text
              fontSize={'9px'}
              fontWeight={'800'}
              lineHeight={'10px'}
              color={'#CEBFBF'}
            >
              Withdraw
            </Text>
          </Button>
        </Stack>
      </GridItem>
      <GridItem colSpan={4}>
        <Divider orientation={'horizontal'} />
      </GridItem>
    </>
  );
}
export default CoinItem;