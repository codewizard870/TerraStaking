import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'
import { MdInfoOutline } from 'react-icons/md';

import { OpenDepositModal, useStore } from '../../../../store';

const ProjectedPrice: FunctionComponent = (props) => {
  return (
    <Flex w={'100%'} direction="column">
      <HStack>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          PROJECTED TerraT PRICE 
        </Text>
        <MdInfoOutline />
      </HStack>
      <HStack w={'100%'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          1.25
        </Text>
        <Text
          fontSize={'25px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          UST
        </Text>
      </HStack>
    </Flex>
  );
}
export default ProjectedPrice;