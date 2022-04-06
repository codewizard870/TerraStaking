import React, { FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Button, Box, useDisclosure } from '@chakra-ui/react'

import TerraIcon from "./../../../assets/Terra.svg"
import Warning from "./../../../assets/Warning.svg"
import UstAprChart from '../AprChart';
import { useStore, useOpenDepositModal } from '../../../store';

const data = [
  {
    timestamp: 1648939268,
    apr: 35.4,
  },
  {
    timestamp: 1648939268,
    apr: 33.4,
  },
  {
    timestamp: 1648939268,
    apr: 39.4,
  },
  {
    timestamp: 1648939268,
    apr: 43.4,
  },
  {
    timestamp: 1648939268,
    apr: 68.4,
  },      
];

const UstPanel: FunctionComponent = (props) => {
  const openDepositModal = useOpenDepositModal();

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
        <Image src={TerraIcon} w='56px' />
        <VStack align={'baseline'}>
          <Text
            fontSize={'35px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            UST
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
      <UstAprChart data={data} id={"ust"}/>
      <Button mx={'60px'} h={'45px'} background={'#493C3C'} rounded={'25px'}>
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
          onClick={() => {
            if(openDepositModal != undefined )
              openDepositModal()
          }}
        >
          STAKE YOUR UST NOW!
        </Text>
      </Button>
    </VStack >
  );
}
export default UstPanel;