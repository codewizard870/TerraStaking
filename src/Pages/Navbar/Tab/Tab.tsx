import React, { FunctionComponent } from 'react';
import { useNavigate } from "react-router-dom";
import { Flex, Text } from '@chakra-ui/react'
import {useStore, ActionKind} from '../../../store';

interface Props {
  id: string,
}
const Tab: FunctionComponent<Props> = ({id, children}) => {
  const {state, dispatch} = useStore();
  const selected = id == state.tab;
  const navigate = useNavigate();

  const clickTab = () => {
    dispatch({type: ActionKind.setTab, payload:id});

    if(id=='bridge')
      window.open('https://rainbowbridge.app/transfer', '_blank')?.focus();
    else
      navigate("/" + id);
  }
  return (
    <Flex
      fontSize={'20px'}
      fontWeight={'800'}
      height={'53px'}
      background={selected ? '#212121' : 'black'} //#212121
      justify={'center'}
      align={'center'}
      rounded={'15px'}
      cursor={'pointer'}
      p={'18px'}
      onClick={() => {clickTab()}}
    >
      <Text color={selected? 'white' : '#666666'}>{children}</Text>
    </Flex>
  );
}

export default Tab;