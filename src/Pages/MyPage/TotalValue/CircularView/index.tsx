import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useUSTBalance, useUSTDeposited, useLUNADeposited, useStore, useUSTPrice, useLUNAPrice } from '../../../../store';
import { floor, floorNormalize } from '../../../../Util';

const CircularView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const ustPrice = useUSTPrice();
  const lunaPrice = useLUNAPrice();

  const ustBalance = floor(useUSTBalance() * ustPrice);
  const ustDeposited = floor(useUSTDeposited() * ustPrice) + floorNormalize(state.userInfoUst.reward_amount * ustPrice);
  const lunaDeposited = floor(useLUNADeposited() * lunaPrice) + floorNormalize(state.userInfoLuna.reward_amount * lunaPrice);
  const total = ustBalance + ustDeposited + lunaDeposited;

  const percent1 = Math.floor(ustBalance * 100 / total);
  const percent2 = Math.floor(ustDeposited * 100 / total);
  const percent3 = Math.floor(lunaDeposited * 100 / total);

  return (
    <Flex align={'center'} minWidth={'250px'} h={'250px'} justify='center' transform={'rotate(-90deg)'}>
      <CircularProgress
        position={'absolute'}
        value={percent1}
        size={'215px'}
        capIsRound={true}
        color={'#F72585'}
        trackColor={'#493C3C'}
        thickness='8px'
      />
      <CircularProgress
        position={'absolute'}
        value={percent2}
        size={'162px'}
        capIsRound={true}
        color={'#6493F1'}
        trackColor={'none'}
        // thickness='12px'
      />
      <CircularProgress
        position={'absolute'}
        value={percent3}
        size={'113px'}
        capIsRound={true}
        color={'#F9D85E'}
        trackColor={'none'}
        thickness='15px'
      />
    </Flex>
  );
}
export default CircularView;