import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import { Grid, GridItem, Tooltip } from '@chakra-ui/react'

import UsdcIcon from './../../../assets/Usdc.svg'
import UsdtIcon from './../../../assets/Usdt.svg'
import DaiIcon from './../../../assets/Dai.svg'
import UsnIcon from './../../../assets/Usn.svg'
import WbtcIcon from './../../../assets/Wbtc.svg'
import EthIcon from './../../../assets/Eth.png'
import WnearIcon from './../../../assets/Wnear.svg'

import {
  OpenDepositModal,
  OpenWithdrawModal,
  useStore,
  useLUNAApr,
  useLUNADeposited,
  useExchangeRate,
} from '../../../store';
import { floor, floorNormalize } from '../../../Util';
import CoinItem from './CoinItem';

const CoinPanel: FunctionComponent = (props) => {
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
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'13px'}
              fontWeight={'800'}
              lineHeight={'15px'}
            >
              Name
            </Text>
          </Flex>
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
                TVL
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
        <CoinItem 
          name='USDC' 
          description='USD Coin'
          avatar={UsdcIcon}
          apr={14.87}
          tvl_coin={47243320}
          tvl_usd={47243320}
        />
        <CoinItem 
          name='USDT' 
          description='USD Coin'
          avatar={UsdtIcon}
          apr={14.87}
          tvl_coin={47243320}
          tvl_usd={47243320}
        />
        <CoinItem 
          name='DAI' 
          description='Dai'
          avatar={DaiIcon}
          apr={14.87}
          tvl_coin={47243320}
          tvl_usd={47243320}
        />
        <CoinItem 
          name='USN' 
          description='USD NEAR'
          avatar={UsnIcon}
          apr={14.87}
          tvl_coin={47243320}
          tvl_usd={47243320}
        />
        <CoinItem 
          name='wBTC' 
          description='Wrapped Bitcoin'
          avatar={WbtcIcon}
          apr={14.87}
          tvl_coin={47243320}
          tvl_usd={47243320}
        />
        <CoinItem 
          name='ETH' 
          description='Ethereum'
          avatar={EthIcon}
          apr={14.87}
          tvl_coin={47243320}
          tvl_usd={47243320}
        />
        <CoinItem 
          name='wNEAR' 
          description='Wrapped Near'
          avatar={WnearIcon}
          apr={14.87}
          tvl_coin={47243320}
          tvl_usd={47243320}
        />
      </Grid>
    </VStack>
  );
}
export default CoinPanel;