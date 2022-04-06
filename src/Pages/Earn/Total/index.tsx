import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'

import Warning from "./../../../assets/Warning.svg"

const Total: FunctionComponent = (props) => {
  return (
    <VStack 
      w={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      align={'center'}
      spacing={'64px'}
      px={{sm:'10px', md:'20px', lg:'50px'}}
      py={{sm:'10px', md:'20px', lg:'59px'}}
    >
      <VStack w={'100%'} align={'baseline'}>
        <HStack spacing={'10px'}>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'24px'}
          >
            TOTAL DEPOSIT
          </Text>
          <Image src={Warning} w={'13px'}/>
        </HStack>
        <HStack align={'baseline'}>
          <Text
            fontSize={'35px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            532,875 UST
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
      <HStack
        w={'100%'}
        spacing={'24px'}
        justify={'end'}
      >
        <Button w={'200px'} h={'45px'} background={'#493C3C'} _hover={{bg: 'black'}} rounded={'25px'}>
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
          _hover={{bg: '#493C3C'}}
          border={'solid 1px'}
          borderColor={'white'} 
          rounded={'25px'}
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
export default Total;