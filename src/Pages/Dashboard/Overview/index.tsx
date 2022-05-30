import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, Image, Link, Center, Divider } from '@chakra-ui/react'

import TotalLocked from './TotalLocked';
import CircularView from './CircularView';
import ValueView from './ValueView';
import LockedChart from './LockedChart';

const Overview: FunctionComponent = (props) => {
  return (
    <Stack
      mt={'53px'}
      direction={{ sm: 'column', md: 'row', lg: 'row' }}
      rounded={'25px'}
      background={'#212121'}
      w='100%'
      minH={{ base: 'auto', lg: '434px' }}
      spacing={'50px'}
      px={{ sm: '10px', md: '20px', lg: '50px' }}
      py={{ sm: '10px', md: '20px', lg: '60px' }}
      zIndex='2'
    >
      <Flex
        direction={'column'}
        minW={{ sm: '100%', md: '100%', lg: '382px' }}
      >
        <TotalLocked />
        <Stack
          mt={'53px'}
          spacing={'36px'}
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
  );
}
export default Overview;