import React, { FunctionComponent } from 'react';
import { HStack, Stack, VStack, Flex, Text, Image, Link, Center, Divider } from '@chakra-ui/react'


import EarnChart from './EarnChart';
import Earn from './Earn';
import Value from './Value';


const How: FunctionComponent = (props) => {
  return (
    <VStack 
      pt={'52px'} 
      w={'100%'}
      h={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      p={{sm:'10px', md:'20px', lg:'59px'}}
      align={'baseline'}
    >
      
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        HOW MUCH CAN I EARN?
      </Text>
      <Stack
        direction={{sm:'column', md:'row', lg:'row'}}
        align={{sm: 'baseline', md: 'center', lg: 'center'}}
        spacing={'51px'}
        w={'100%'}
      >
        <Earn />
        <Center 
          height={'304px'}
          display={{sm:'none', md:'block', lg:'block'}}
        >
          <Divider orientation={'vertical'} />
        </Center>
        <Center 
          width={'100%'}
          display={{sm:'block', md:'none', lg:'none'}}
        >
          <Divider orientation={'horizontal'} />
        </Center>
        <Value />
        <EarnChart />
      </Stack>
    </VStack>
  );
}
export default How;