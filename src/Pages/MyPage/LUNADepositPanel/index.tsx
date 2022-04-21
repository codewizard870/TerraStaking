import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import { Grid, GridItem, Tooltip } from '@chakra-ui/react'

import LunaIcon from './../../../assets/Luna.svg'
import {
  OpenDepositModal,
  OpenWithdrawModal,
  useStore,
  useLUNAApr,
  useLUNADeposited,
  useExchangeRate,
} from '../../../store';
import AnimationNumber from '../../Components/AnimationNumber';
import { floor, floorNormalize } from '../../../Util';

const LUNADepositPanel: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const apr = useLUNAApr();
  const rate = useExchangeRate();

  const lunaDeposited = useLUNADeposited() + floorNormalize(state.userInfoLuna.reward_amount);
  const amount = lunaDeposited * rate;

  return (
    <VStack
      w={'100%'}
      rounded={'25px'}
      background={'#212121'}
      align={'center'}
      spacing={'34px'}
      color={'#CEC0C0'}
      px={{ sm: '10px', md: '20px', lg: '50px' }}
      py={{ sm: '10px', md: '20px', lg: '29px' }}
    >
      <Grid
        templateColumns="15% 25% 25% auto"
        gap={0}
        w={'100%'}
      >
        <GridItem w='100%' h='45px'>

        </GridItem>
        <GridItem w='100%' h='45px'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Tooltip
              label="Current annualized deposit rate"
              background={'#C4C4C4'} hasArrow
              placement='top-start'
              color={'black'}
            >
              <Text
                fontSize={'13px'}
                fontWeight={'800'}
                lineHeight={'15px'}
              >
                APY
              </Text>
            </Tooltip>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='45px'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Tooltip
              label="Total of all LUNA deposits including earnings "
              background={'#C4C4C4'} hasArrow
              placement='top-start'
              color={'black'}
            >
              <Text
                fontSize={'13px'}
                fontWeight={'800'}
                lineHeight={'15px'}
              >
                Total Balance
              </Text>
            </Tooltip>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='45px'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'13px'}
              fontWeight={'800'}
              lineHeight={'15px'}
            >
              Actions
            </Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={4}>
          <Divider orientation={'horizontal'} />
        </GridItem>
        <GridItem w={'100%'} h={'100px'}>
          <HStack
            w={'100%'}
            h={'100%'}
            spacing={'27px'}
            align={'center'}
            justify={'center'}
            display={{ sm: 'none', md: 'none', lg: 'flex' }}
          >
            <Image src={LunaIcon} w={'50px'} />
            <VStack align={'baseline'} spacing={'0px'}>
              <Text
                fontSize={'20px'}
                fontWeight={'800'}
                lineHeight={'36px'}
                color={'white'}
              >
                LUNA
              </Text>
              <Text
                fontSize={'13px'}
                fontWeight={'400'}
                lineHeight={'15.6px'}
              >
                Luna
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
              <AnimationNumber value={amount} /> UST
            </Text>
            <Text
              fontSize={'13px'}
              fontWeight={'400'}
              lineHeight={'15.6px'}
            >
              <AnimationNumber value={lunaDeposited} /> LUNA
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
              onClick={() => OpenDepositModal(state, dispatch, "luna")}
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
              onClick={() => OpenWithdrawModal(state, dispatch, "luna")}
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
      </Grid>
    </VStack>
  );
}
export default LUNADepositPanel;