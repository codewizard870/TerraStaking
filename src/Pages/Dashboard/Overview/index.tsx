import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, Image, Link, Center, Divider } from '@chakra-ui/react'

import TotalLocked from './TotalLocked';
import CircularView from './CircularView';
import ValueView from './ValueView';
import LockedChart from './LockedChart';

const Overview: FunctionComponent = (props) => {
  return (
    <Flex
      mt={'53px'}
      w={'100%'}
      minH={{ base: 'auto', lg: '434px' }}
      position='relative'
    >
      <Stack
        direction={{ sm: 'column', md: 'row', lg: 'row' }}
        rounded={'25px'}
        background={'#212121'}
        w='100%'
        spacing={'50px'}
        align='center'
        px={{ sm: '10px', md: '20px', lg: '50px' }}
        py={{ sm: '10px', md: '20px', lg: '60px' }}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        zIndex='2'
      >
        <Flex
          direction={'column'}
          minW={{ sm: '100%', md: '100%', lg: '382px' }}
        >
          <TotalLocked />
          <Stack
            mt={'53px'}
            spacing={'56px'}
            align={'center'}
            direction={{ base: 'column', lg: 'row' }}
          >
            <CircularView />
            <ValueView />
          </Stack>
        </Flex>
        <Center
          height={'304px'}
          borderColor='#5C5353'
          display={{ sm: 'none', md: 'block', lg: 'block' }}
        >
          <Divider orientation={'vertical'} />
        </Center>
        <Center
          width={'100%'}
          borderColor='#5C5353'
          display={{ sm: 'block', md: 'none', lg: 'none' }}
        >
          <Divider orientation={'horizontal'} />
        </Center>
        <LockedChart />
      </Stack>
      <Flex
        rounded={'25px'}
        background={'#212121'}
        position='absolute'
        w='100%'
        h='100%'
        zIndex='1'
        top='7px'
      >
      </Flex>
    </Flex>
  );
}
export default Overview;