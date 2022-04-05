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
    navigate("/" + id);
  }
  return (
    <Flex
      fontFamily={'SF Pro'}
      fontSize={'20px'}
      fontWeight={'860'}
      width={'160px'}
      height={'53px'}
      background={selected ? '#212121' : 'black'} //#212121
      justify={'center'}
      align={'center'}
      rounded={'20px'}
      cursor={'pointer'}
      onClick={() => {clickTab()}}
    >
      <Text color='white'>{children}</Text>
    </Flex>
  );
}

export default Tab;