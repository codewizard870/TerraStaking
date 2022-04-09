import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import { MdInfoOutline } from 'react-icons/md';

import { OpenDepositModal, useStore } from '../../../../store';

const Deposited: FunctionComponent = (props) => {
  return (
    <Flex w={'100%'} h={'100%'} direction="column" color='#CEC0C0' align={'baseline'}>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'30px'}
      >
        150,000
      </Text>
      <Divider orientation='horizontal' />
      <Text
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'20px'}
      >
        Your Total Deposit in UST
      </Text>
    </Flex>
  );
}
export default Deposited;