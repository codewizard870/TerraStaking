import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'

import LunaIcon from './../../../assets/Luna.svg'

const LUNADepositPanel: FunctionComponent = (props) => {
  return (
    <VStack 
      w={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      align={'center'}
      spacing={'34px'}
      px={{sm:'10px', md:'20px', lg:'50px'}}
      py={{sm:'10px', md:'20px', lg:'29px'}}
    >
      <Grid 
        templateColumns='[first] 20% [line2] 20% [line3] 20% line[4] auto' 
        gap={6} 
        w={'100%'}
      >
        <GridItem w='100%' h='70'> 

        </GridItem>
        <GridItem w='100%' h='70'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'13px'}
              fontWeight={'860'}
              lineHeight={'15px'}
            >
              APY
            </Text>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='70'>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'13px'}
              fontWeight={'860'}
              lineHeight={'15px'}
            >
              Deposit Amount
            </Text>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='70'> 
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'13px'}
              fontWeight={'860'}
              lineHeight={'15px'}
            >
              Actions
            </Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={4}>
          <Divider orientation={'horizontal'} />
        </GridItem>
        <GridItem w={'100%'} h={'140px'}>
          <HStack 
            w={'100%'} 
            h={'100%'} 
            spacing={'27px'} 
            align={'center'} 
            justify={'center'}
            display={{sm: 'none', md: 'none', lg: 'flex'}}
          >
            <Image src={LunaIcon} w={'50px'} />
            <VStack align={'baseline'}>
              <Text
                fontSize={'35px'}
                fontWeight={'860'}
                lineHeight={'36px'}
              >
                LUNA
              </Text>
              <Text
                fontSize={'15px'}
                fontWeight={'860'}
                lineHeight={'16px'}
              >
                Luna
              </Text>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem w={'100%'} h={'140px'}>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'15px'}
              fontWeight={'860'}
              lineHeight={'16px'}
            >
              18,61%
            </Text>
          </Flex>
        </GridItem>
        <GridItem w={'100%'} h={'140px'}>
          <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text
              fontSize={'15px'}
              fontWeight={'860'}
              lineHeight={'16px'}
            >
              243,230 UST
            </Text>
          </Flex>
        </GridItem>
        <GridItem w={'100%'} h={'140px'}>
          <Stack 
            direction={{sm: 'column', md: 'column', lg: 'row'}}
            w={'100%'} 
            h={'100%'} 
            align={'center'} 
            justify={'center'} 
            spacing={'15px'}
          >
            <Button w={'92px'} h={'25px'} background={'#493C3C'} rounded={'25px'}>
              <Text
                fontSize={'9px'}
                fontWeight={'860'}
                lineHeight={'10px'}              
              >
                Deposit
              </Text>
            </Button>
            <Button w={'92px'} h={'25px'} background={'#493C3C'} rounded={'25px'}>
              <Text
                fontSize={'9px'}
                fontWeight={'860'}
                lineHeight={'10px'}              
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