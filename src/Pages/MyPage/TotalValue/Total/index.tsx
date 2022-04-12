import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Tooltip, Button } from '@chakra-ui/react'

import { MdSwapHoriz } from 'react-icons/md'
import { useUSTBalance, useUSTDeposited, useLUNADeposited, useStore } from '../../../../store';
import Warning from "./../../../../assets/Warning.svg"
import { useNavigate } from 'react-router-dom';

const Total: FunctionComponent = (props) => {
  const navigate = useNavigate();

  const { state, dispatch } = useStore();
  const ustPrice = state.ustPrice;
  const lunaPrice = state.lunaPrice;
  const ustBalance = Math.floor(useUSTBalance() * ustPrice);

  const ustDeposited = useUSTDeposited()  * ustPrice;
  const lunaDeposited = useLUNADeposited() * lunaPrice;
  const total = ustBalance + ustDeposited + lunaDeposited;

  return (
    <HStack justify={"space-between"} w={'100%'}>
      <VStack align={'baseline'} w={'100%'}>
        <HStack align={'baseline'} w={'100%'}>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'24px'}
          >
            TOTAL VALUE
          </Text>
          <Tooltip
            label="Total value of UST/Luna deposits, payed interest, and UST Wallet Balance"
            background={'#C4C4C4'}
            color={'black'} hasArrow
            placement='top-start'
          >
            <Image src={Warning} w={13} />
          </Tooltip>
        </HStack>
        <HStack align={'baseline'} w={'100%'}>
          <Text
            fontSize={'35px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            {total.toLocaleString()}
          </Text>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            UST
          </Text>
        </HStack>
      </VStack>
      <a href="https://app.terraswap.io/swap?to=&type=swap&from=uluna" target={'_blank'} rel="noreferrer">
        <Button w={'92px'} h={'25px'} background={'none'} rounded={'25px'} borderColor={'white'} variant='outline'>

          <MdSwapHoriz />
          <Text
            fontSize={'9px'}
            fontWeight={'860'}
            lineHeight={'10px'}
          >
            Swap
          </Text>
        </Button>
      </a>
    </HStack>
  );
}
export default Total;