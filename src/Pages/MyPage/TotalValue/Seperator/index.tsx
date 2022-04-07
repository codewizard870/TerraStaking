import React, { FunctionComponent, useEffect } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'

import {MdInfo, MdSwapHoriz} from 'react-icons/md'
import BlackPanel from './../../../../assets/BlackPanel.svg'
import YellowPanel from './../../../../assets/YellowPanel.svg'
import GreenPanel from './../../../../assets/GreenPanel.svg'
import BluePanel from './../../../../assets/BluePanel.svg'
import { useUSTBalance, useUSTDeposited, useLUNADeposited, useStore } from '../../../../store';

const Seperator: FunctionComponent = (props) => {
  // const ustPrice = useUstPrice();
  // const lunaPrice = useLunaPrice();
  const {state, dispatch} = useStore();
  const ustPrice = state.ustPrice;
  const lunaPrice = state.lunaPrice;
  const ustBalance = Math.floor(useUSTBalance() * ustPrice);
  const ustDeposited = Math.floor(useUSTDeposited() * ustPrice);
  const lunaDeposited = Math.floor(useLUNADeposited() * lunaPrice);

  return (
    <VStack align={'baseline'} w={'226px'}>
      <HStack spacing={'10px'}>
        <Image src={BlackPanel} w={'15px'} />
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          UST Wallet Balance 
        </Text>
        <MdInfo size={'11'}/>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        fontStyle={'italic'}
      >
          $&nbsp;{ustBalance.toLocaleString()}
      </Text>
      {/* --------------------------------- */}
      <HStack spacing={'10px'}>
        <Image src={GreenPanel} w={'15px'} />
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          Deposit Total 
        </Text>
        <MdInfo size={'11'}/>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        fontStyle={'italic'}
      >
        $&nbsp;{(ustDeposited + lunaDeposited).toLocaleString()}
      </Text>
      {/* --------------------------------- */}
      <HStack spacing={'10px'}>
        <Image src={BluePanel} w={'15px'} />
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          UST Deposit 
        </Text>
        <MdInfo size={'11'}/>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        fontStyle={'italic'}
      >
        $&nbsp;{ustDeposited.toLocaleString()}
      </Text>
      {/* --------------------------------- */}
      <HStack spacing={'10px'}>
        <Image src={YellowPanel} w={'15px'} />
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          LUNA Deposit 
        </Text>
        <MdInfo size={'11'}/>
      </HStack>
      <Text
        fontSize={'14px'}
        fontWeight={'400'}
        fontStyle={'italic'}
      >
        $&nbsp;{lunaDeposited.toLocaleString()}
      </Text>
    </VStack>
  );
}
export default Seperator;