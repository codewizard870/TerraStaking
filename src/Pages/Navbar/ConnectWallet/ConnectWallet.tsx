import React, { FunctionComponent } from 'react';
import { Flex, Text, Button, Image } from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  tabStatus,
  selectTab,
  setTabStatus
} from '../../../app/appSlice';
import Wallet from '../../../assets/Wallet.svg';

// interface Props {
//   id: tabStatus,
// }
const ConnectWallet: FunctionComponent = () => {
  const currentTab = useAppSelector(selectTab);
  const dispatch = useAppDispatch();

  return (
    <Button
      fontSize={'13px'}
      fontWeight={'700'}
      width={'171px'}
      height={'36px'}
      background={'none'}
      border={'solid 2px #F9D85E'}
      rounded={'25px'}
      onClick={() => {}}
    >
      <Image src={Wallet} width={'15px'}/>
      <Text ml={'11px'} color={'#F9D85E'}>
        Connect Wallet
      </Text>
    </Button>
  );
}

export default ConnectWallet;