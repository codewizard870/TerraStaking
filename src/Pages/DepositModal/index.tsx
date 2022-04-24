import React, { FunctionComponent, useState } from 'react';
import { Stack, Flex, HStack, Button, Text, Divider } from '@chakra-ui/react'
import { Deposit, MsgExecuteContract, WasmAPI, Coin } from '@terra-money/terra.js'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react'
import { toast } from 'react-toastify';

import CoinTab from './CoinTab';
import InputPanel from './InputPanel';
import SliderWish from './SliderWish';
import Info from './Info';
import { useStore, useWallet, useLCD, ActionKind } from '../../store';
import {estimateSend, fetchData, sleep} from '../../Util';
import {POOL, successOption} from '../../constants';

interface Props{
  isOpen: boolean,
  onClose: () => void,
}
const DepositModal: FunctionComponent<Props> = ({isOpen, onClose}) => {
  const [amount, setAmount] = useState('0');
  const wallet = useWallet();
  const lcd = useLCD();
  const {state, dispatch} = useStore();
  const coinType = state.coinType;

  const deposit = async () => {
    if(parseFloat(amount) <= 0  || !wallet?.walletAddress)
      return;
      
    let val = Math.floor(parseFloat(amount) * 10 ** 6);
    let msg;
    if(coinType === 'ust')
      msg = { deposit_ust: {qualified: state.qualified} }
    else
      msg = { deposit_luna: {qualified: state.qualified} }

    let deposit_msg = new MsgExecuteContract(
      wallet?.walletAddress,
      POOL,
      msg,
      coinType === 'ust'? {uusd: val} : {uluna: val}
    );
    let res = await estimateSend(wallet, lcd, [deposit_msg], "Success Deposit", "deposit");
    if(res){
      dispatch({type: ActionKind.setTxhash, payload: res});
      onClose();
      if(state.openWaitingModal)
        state.openWaitingModal();

      let count = 10;
      let height = 0;
      while (count > 0) {
        await lcd.tx.txInfo(res)
          // eslint-disable-next-line no-loop-func
          .then((e) => {
            if (e.height > 0) {
              toast.dismiss();
              toast("Success", successOption);
              height = e.height;
            }
          })
          .catch((e) => {})

        if (height > 0) break;

        await sleep(1000);
        count--;
      }
      
      if(state.closeWaitingModal)
        state.closeWaitingModal();

      fetchData(state, dispatch);
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
        <Info amount={amount}/>
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Button 
          w={'100%'} 
          h={'45px'} 
          mt={'26px'} 
          background={'#493C3C'} 
          rounded={'25px'}
          onClick={() => deposit()}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
                     
          >
            Proceed
          </Text>
        </Button>
        <ModalCloseButton color={'#CEBFBF'} />
      </ModalContent>
    </Modal>
  );
}
export default DepositModal;

