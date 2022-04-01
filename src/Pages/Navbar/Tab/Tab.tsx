import React, { FunctionComponent } from 'react';
import { useNavigate } from "react-router-dom";
import { Flex, Text } from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  tabStatus,
  selectTab,
  setTabStatus
} from '../../../app/appSlice';

interface Props {
  id: tabStatus,
}
const Tab: FunctionComponent<Props> = ({id, children}) => {
  const currentTab = useAppSelector(selectTab);
  const selected = id == currentTab;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickTab = () => {
    dispatch(setTabStatus(id));
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