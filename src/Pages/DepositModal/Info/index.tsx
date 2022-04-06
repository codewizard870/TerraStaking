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
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
}
const Info: FunctionComponent<Props> = (props) => {
  return (
    <Flex
      direction={'column'}
      rounded={'10px'}
      w={'100%'}
      h={'45px'}
      mt={'58px'}
      align={'center'}
      justify={'space-between'}
    >

        <Text
          fontSize={'9px'}
          fontWeight={'860'}
          lineHeight={'10px'}
          color={'#F9D85E'}
        >
          Tx Fee
        </Text>

    </Flex>
  );
}
export default Info;