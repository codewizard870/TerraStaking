import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'

import {MdNorthEast} from 'react-icons/md'

const TransactionHistory: FunctionComponent = (props) => {
  return (
    <VStack
      w={'100%'}
      spacing={'18px'}
    >
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        TRANSACTION HISTORY
      </Text>
      <VStack 
        w={'100%'}
        rounded={'25px'} 
        background={'#212121'} 
        align={'center'}
        spacing={'34px'}
        px={{sm:'10px', md:'20px', lg:'50px'}}
        py={{sm:'10px', md:'20px', lg:'76px'}}
      >
        <VStack w={'100%'}>
          <Flex w={'100%'} h={'76px'} justify={'space-between'} align={'center'}>
            <VStack align={'baseline'}>
              <Text
                fontSize={'13px'}
                fontWeight={'860'}
                lineHeight={'15px'}
              >
                Earn
              </Text>
              <HStack
                spacing={'10px'}
              >
                <Text
                  fontSize={'13px'}
                  fontWeight={'860'}
                  lineHeight={'15px'}
                >
                  Deposited 25 UST
                </Text>
                <MdNorthEast/>
              </HStack>
            </VStack>
            <Text
              fontSize={'10px'}
              fontWeight={'860'}
              lineHeight={'12px'}
            >
              Tue, Jan 13, 2022, 11:02:19 PM
            </Text>
          </Flex>
          <Divider orientation='horizontal' />
        </VStack>
      </VStack>
    </VStack>
  );
}
export default TransactionHistory;