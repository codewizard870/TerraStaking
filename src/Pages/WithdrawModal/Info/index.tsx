import React, { FunctionComponent } from 'react';
import { 
  VStack, 
  HStack, 
  Stack, 
  Box, 
  Flex, 
  Text, Input, 
  Slider, 
  SliderTrack, 
  SliderThumb, 
  SliderFilledTrack 
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";

interface Props {

}
const Info: FunctionComponent<Props> = (props) => {

  return (
    <VStack
      w={'100%'}
      mt={'11px'}
      align={'center'}
      spacing={'13px'}
      color={'#CEC0C0'}
    >
      <HStack justify={'space-between'} w={'100%'}>
        <Text
          fontSize={'9px'}
          fontWeight={'400'}
          lineHeight={'10px'}
        >
          Tx Fee
        </Text>
        <Text
          fontSize={'9px'}
          fontWeight={'400'}
          lineHeight={'10px'}
        >
          0.25 UST
        </Text>
      </HStack>
      <HStack justify={'space-between'} w={'100%'}>
        <Text
          fontSize={'9px'}
          fontWeight={'400'}
          lineHeight={'10px'}
        >
          Send Amount
        </Text>
        <Text
          fontSize={'9px'}
          fontWeight={'400'}
          lineHeight={'10px'}
        >
          100,346.25 UST
        </Text>
      </HStack>
    </VStack>
  );
}
export default Info;