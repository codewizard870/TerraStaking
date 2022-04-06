import React, { FunctionComponent, useState } from 'react';
import { Stack, Flex, HStack, Button, Text, Divider } from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import CoinTab from './CoinTab';
import InputPanel from './InputPanel';
import SliderWish from './SliderWish';
import Info from './Info';

interface Props{
  isOpen: boolean,
  onClose: () => void,
}
const DepositModal: FunctionComponent<Props> = ({isOpen, onClose}) => {
  const [amount, setAmount] = useState('');
  const [coin, setCoin] = useState('ust');

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
          <CoinTab coin={coin} setCoin={setCoin}/>
        </HStack>
        <InputPanel amount={amount} setAmount={setAmount} coin={coin}/>
        <SliderWish amount={amount} setAmount={setAmount}/>
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Info />
        <Divider mt={'23px'} orientation='horizontal' variant={'dashed'} color={'#CEC0C0'} />
        <Button w={'100%'} h={'45px'} mt={'26px'} background={'#493C3C'} rounded={'25px'}>
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
export default DepositModal;