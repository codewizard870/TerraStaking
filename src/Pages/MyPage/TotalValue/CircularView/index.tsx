import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useUSTBalance, useUSTDeposited, useLUNADeposited, useStore } from '../../../../store';

const CircularView: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  const ustPrice = state.ustPrice;
  const lunaPrice = state.lunaPrice;
  const ustBalance = Math.floor(useUSTBalance() * ustPrice);

  const ustDeposited = Math.floor(useUSTDeposited() * ustPrice);
  const lunaDeposited = Math.floor(useLUNADeposited() * lunaPrice);
  const total = ustDeposited + lunaDeposited;

  const percent1 = Math.floor((ustBalance+lunaDeposited)/total * 100);
  const percent2 = Math.floor(ustBalance/total * 100);

  return (
    <Flex align={'center'} minWidth={'180px'} h={'180px'} justify='center'>
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
        value={80} 
        size={'162px'} 
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'none'}
      />
      <CircularProgress 
        position={'absolute'}
        value={60} 
        size={'162px'} 
        capIsRound={true}
        color={'#6493F1'}
        trackColor={'none'}
      />
      <CircularProgress 
        position={'absolute'}
        value={20} 
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