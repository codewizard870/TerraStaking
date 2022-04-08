import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { useStore, useUSTPrice, useLUNAPrice } from '../../../../store';

const CircularView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const history = state.amountHistory;
  const ustPrice = useUSTPrice();
  const lunaPrice = useLUNAPrice();
  const last = history.length - 1;
  const ustAmount = last >= 0 ? history[last].ust_amount * ustPrice : 0;
  const lunaAmount = last >= 0 ? history[last].luna_amount * lunaPrice : 0;
  const percent = ustAmount + lunaAmount >= 0 ? lunaAmount * 100 / (ustAmount + lunaAmount) : 0;

  return (
    <Flex>
      <CircularProgress
        value={percent}
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