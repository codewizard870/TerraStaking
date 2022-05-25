import React, { FunctionComponent } from 'react';
import { HStack, Flex, Text, Image, Link } from '@chakra-ui/react'

import ExternalLink from "./../../../assets/ExternalLink.svg"

const Title: FunctionComponent = (props) => {
  return (
    <Flex ml={'13px'} w={'100%'} justify={'left'}  align={'baseline'} direction='column'>
      <Text
        fontSize={'40px'}
        fontWeight={'800'}
      >
        Terms of Service
      </Text>
      <Text
        fontSize='13px'
        fontWeight='800'
      >
        Updated: 14 Apr 21
      </Text>
    </Flex>
  );
}
export default Title;