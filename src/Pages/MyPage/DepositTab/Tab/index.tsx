import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
  selectDepositTab,
  appSlice,
  depositTabStatus
} from '../../../../app/appSlice';

interface Props{
  id: depositTabStatus
}
const Tab: FunctionComponent<Props> = (props) => {
  const depositTab = useAppSelector(selectDepositTab);
  const dispatch = useAppDispatch();
  return (
    <Flex 
      background={depositTab==props.id?'#493C3C':'none'}
      rounded={'25px'}
      w={'30%'}
      h={'100%'}
      justify={'center'}
      align={'center'}
      cursor={'pointer'}
      onClick={() => {dispatch(appSlice.actions.setDepositTabStatus(props.id))}}
    >
      <Text
        fontSize={'13px'}
        fontWeight={'860'}
        lineHeight={'16px'}
      >
        {props.children}
      </Text>
    </Flex>
  );
}
export default Tab;