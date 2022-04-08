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
import {estimateSend, fetchData} from '../../Util';
import { successOption, errorOption, REQUEST_ENDPOINT, VUST, VLUNA, MOTHER_WALLET } from '../../constants';

import {toast} from 'react-toastify'

interface Props{
  isOpen: boolean,
  onClose: () => void,
}
const WithdrawModal: FunctionComponent<Props> = ({isOpen, onClose}) => {
  const [amount, setAmount] = useState('');
  const wallet = useWallet();
  const lcd = useLCD();
  const {state, dispatch} = useStore();
  const coinType = state.coinType;

  const withdraw = async () => {
    if( coinType === 'ust' && wallet?.walletAddress ){
      let val = Math.floor(parseFloat(amount) * 10 ** 6);
      let withdraw_msg = new MsgExecuteContract(
        wallet?.walletAddress,
        VUST,
        {
          "increase_allowance": {
              "spender": `${MOTHER_WALLET}`,
              "amount": `${val}`,
              "expires": {
                  "never": {}
              }
          }
        },
        {}
      );
      await estimateSend(wallet, lcd, [withdraw_msg], "Success request withdraw", "request withdraw");

      var formData = new FormData()
      formData.append('wallet', wallet.walletAddress.toString());
      formData.append('coinType', 'ust')
      formData.append('amount', val.toString())

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(REQUEST_ENDPOINT + 'withdraw', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          toast('Request Success', successOption);
          fetchData(state, dispatch)
        })
        .catch((e) => {
          console.log('Error:' + e)
          toast('Request error', errorOption);
        })
    }
    else if( coinType === 'luna' && wallet?.walletAddress ){
      let val = Math.floor(parseFloat(amount) * 10 ** 6);
      let withdraw_msg = new MsgExecuteContract(
        wallet?.walletAddress,
        VLUNA,
        {
          "increase_allowance": {
              "spender": `${MOTHER_WALLET}`,
              "amount": `${val}`,
              "expires": {
                  "never": {}
              }
          }
        },
        {}
      );
      await estimateSend(wallet, lcd, [withdraw_msg], "Success request withdraw", "request withdraw");

      var formData = new FormData()
      formData.append('wallet', wallet.walletAddress.toString());
      formData.append('coinType', 'luna')
      formData.append('amount', val.toString())

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(REQUEST_ENDPOINT + 'withdraw', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          toast('Request Success', successOption);
          fetchData(state, dispatch)
        })
        .catch((e) => {
          console.log('Error:' + e)
          toast('Request error', errorOption);
        })
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
            Withdraw
          </Text>
          <CoinTab/>
        </HStack>
        <InputPanel amount={amount} setAmount={setAmount}/>
        <SliderWish amount={amount} setAmount={setAmount}/>
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Info />
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Button 
          w={'100%'} 
          h={'45px'} 
          mt={'26px'} 
          background={'#493C3C'} 
          rounded={'25px'}
          onClick={() => withdraw()}
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
export default WithdrawModal;

