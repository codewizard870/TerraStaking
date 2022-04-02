import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, Image, Link } from '@chakra-ui/react'

const TotalLocked: FunctionComponent = (props) => {
  
  return (
    <>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        TOTAL VALUE LOCKED
      </Text>
      <HStack spacing={'10px'} alignItems={'baseline'}>
        <Text
          fontSize={'34px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          165,859,532&nbsp;
        </Text>
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'36px'}
        >
          UST
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={'860'}
          lineHeight={'36px'}
          color={'green'}
        >
          ▲ 2%
        </Text>
      </HStack>
    </>
  );
}
export default TotalLocked;