import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const CircularView: FunctionComponent = (props) => {
  
  return (
    <Flex>
      <CircularProgress 
        value={80} 
        size={'162px'} 
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'black'}
      >
      </CircularProgress>
    </Flex>
  );
}
export default CircularView;