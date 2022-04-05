import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const CircularView: FunctionComponent = (props) => {
  
  return (
    <Flex align={'center'} w={'300px'} h={'180px'} justify='center'>
      <CircularProgress 
        position={'absolute'}
        value={100} 
        size={'162px'} 
        capIsRound={true}
        color={'#57A146'}
        trackColor={'none'}
      />
      <CircularProgress 
        position={'absolute'}
        value={70} 
        size={'162px'} 
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'none'}
      />
      <CircularProgress 
        position={'absolute'}
        value={30} 
        size={'162px'} 
        capIsRound={true}
        color={'#6493F1'}
        trackColor={'none'}
      />
      <CircularProgress 
        position={'absolute'}
        value={10} 
        size={'162px'} 
        capIsRound={true}
        color={'black'}
        trackColor={'none'}
        thickness='12px'
      />
    </Flex>
  );
}
export default CircularView;