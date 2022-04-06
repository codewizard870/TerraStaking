import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'

import {MdInfo, MdSwapHoriz} from 'react-icons/md'
import BlackPanel from './../../../../assets/BlackPanel.svg'
import YellowPanel from './../../../../assets/YellowPanel.svg'
import GreenPanel from './../../../../assets/GreenPanel.svg'
import BluePanel from './../../../../assets/BluePanel.svg'

const Seperator: FunctionComponent = (props) => {
  return (
    <VStack align={'baseline'}>
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
        $ 65,633 
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
        $ 532,875 
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
        $ 243,230 
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
        $ 243,230 
      </Text>
    </VStack>
  );
}
export default Seperator;