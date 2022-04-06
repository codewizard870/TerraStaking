import React, { FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Button, Box } from '@chakra-ui/react'

import LunaIcon from "./../../../assets/Luna.svg"
import Warning from "./../../../assets/Warning.svg"

import LunaAprChart from '../AprChart';

const data = [
  {
    timestamp: 1648939268,
    apr: 37.4,
  },
  {
    timestamp: 1648939268,
    apr: 38.4,
  },
  {
    timestamp: 1648939268,
    apr: 39.4,
  },
  {
    timestamp: 1648939268,
    apr: 83.4,
  },
  {
    timestamp: 1648939268,
    apr: 38.4,
  },      
];


const LunaPanel: FunctionComponent = (props) => {
  return (
    <VStack
      w={'100%'}
      px={'62px'}
      py={'39px'}
      background={'#212121'}
      rounded={'25px'}
      align={'center'}
    >
      <HStack spacing={'14px'} w={'100%'}>
        <Image src={LunaIcon} w='56px' />
        <VStack align={'baseline'}>
          <Text
            fontSize={'35px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            LUNA
          </Text>
          <HStack>
            <Text
              fontSize={'13px'}
              fontWeight={'860'}
              lineHeight={'15px'}
            >
              INTEREST
            </Text>
            <Image src={Warning} w={'11px'} />
          </HStack>
        </VStack>
      </HStack>
      <Flex 
        w={'93px'} 
        h={'29px'} 
        style={{marginTop:'52px'}} 
        rounded={'15px'} 
        background={'#493C3C'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
        >
          APY
        </Text>
      </Flex>
      <HStack mt={'14px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}      
        >
          34.87
        </Text>
        <Text
          fontSize={'20px'}
        >%
        </Text>
      </HStack>
      <LunaAprChart data={data} id={"luna"}/>
      <Button mx={'60px'} h={'45px'} background={'#493C3C'} rounded={'25px'}>
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}              
        >
          STAKE YOUR LUNA NOW!
        </Text>
      </Button>
    </VStack >
  );
}
export default LunaPanel;