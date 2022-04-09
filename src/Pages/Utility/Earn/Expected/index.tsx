import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Image, Link, Center, Divider, Button } from '@chakra-ui/react'

const Expected: FunctionComponent = (props) => {
  return (
    <Flex w={'100%'} h={'100%'} direction="column" align={'baseline'}>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'30px'}
      >
        1,272,891
      </Text>
      <Divider orientation='horizontal' />
      <Text
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'20px'}
      >
        Your expected TerraT Allocation 
      </Text>
      <Text
        mt={'40px'}
        position={'absolute'}
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'36px'}
        fontStyle={'italic'}
        color={'#CEBFBF'}
      >
        The Projected Allocation Value: $323,121.75UST 
      </Text>
    </Flex>
  );
}
export default Expected;