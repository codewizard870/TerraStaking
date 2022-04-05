import React, { FunctionComponent } from 'react';
import { Stack, Flex, Button } from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

interface Props{
  isOpen: boolean,
  onClose: () => void,
}
const DepositModal: FunctionComponent<Props> = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
        background={'#212121'}
        rounded={'25px'}
        w={'562px'}
        h={'433px'}
      >
        <ModalHeader
          fontSize={'20px'}
          lineHeight={'24px'}
          color={'white'}
        >
          Withdraw
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h1>Hello</h1>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default DepositModal;