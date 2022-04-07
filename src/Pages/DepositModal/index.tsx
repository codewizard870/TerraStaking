import React, { FunctionComponent, useState } from 'react';
import { Stack, Flex, HStack, Button, Text, Divider } from '@chakra-ui/react'
import { Deposit, MsgExecuteContract, WasmAPI, Coin } from '@terra-money/terra.js'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react'

import CoinTab from './CoinTab';
import InputPanel from './InputPanel';
import SliderWish from './SliderWish';
import Info from './Info';
import { useStore, useWallet, useLCD } from '../../store';
import {estimateSend} from '../../Util';

interface Props{
  isOpen: boolean,
  onClose: () => void,
}
const DepositModal: FunctionComponent<Props> = ({isOpen, onClose}) => {
  const [amount, setAmount] = useState('');
  const wallet = useWallet();
  const lcd = useLCD();
  const {state, dispatch} = useStore();
  const coinType = state.coinType;

  const deposit = () => {
    if( coinType === 'ust' && wallet?.walletAddress ){
      let val = Math.floor(parseFloat(amount) * 10 ** 6);
      let msg = {
        deposit_ust: {}
      }
      let deposit_msg = new MsgExecuteContract(
        wallet?.walletAddress,
        state.poolAddr,
        msg,
        {uusd: val}
      );
      estimateSend(wallet, lcd, [deposit_msg], "Success Deposit", "deposit");
    }
    else if( coinType === 'luna' && wallet?.walletAddress ){
      let val = Math.floor(parseFloat(amount) * 10 ** 6);
      let msg = {
        deposit_luna: {}
      }
      let deposit_msg = new MsgExecuteContract(
        wallet?.walletAddress,
        state.poolAddr,
        msg,
        {uluna: val}
      );
      estimateSend(wallet, lcd, [deposit_msg], "Success Deposit", "deposit");
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
        background={'#212121'}
        rounded={'25px'}
        w={{sm:'100%', md: '562px', lg:'562px'}}
        h={'453px'}
        px={{sm:'10px', md: '47px', lg: '47px'}}
        py={'39px'}
      >
        <HStack
          fontSize={'20px'}
          lineHeight={'24px'}
          color={'white'}
          justifyContent={'center'}
          mx={'100px'}
          spacing={'8px'}
        >
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'24px'}
          >
            Deposit
          </Text>
          <CoinTab/>
        </HStack>
        <InputPanel amount={amount} setAmount={setAmount}/>
        <SliderWish amount={amount} setAmount={setAmount}/>
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Info />
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Button w={'100%'} h={'45px'} mt={'26px'} background={'#493C3C'} rounded={'25px'}>
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
            onClick={() => deposit()}           
          >
            Proceed
          </Text>
        </Button>
        <ModalCloseButton color={'#CEBFBF'} />
        {/* <ModalBody>
          <h1>Hello</h1>
        </ModalBody> */}

        {/* <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
export default DepositModal;

