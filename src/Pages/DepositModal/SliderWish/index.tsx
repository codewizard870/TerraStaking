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
import { MdCode, MdArrowDropDownCircle } from "react-icons/md";
import Indicator from './Indicator';

interface Props {
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
}
const SliderWish: FunctionComponent<Props> = (props) => {
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
      <HStack 
        w={'100%'}
        h={'42px'}
        justify={'space-between'}
        position={'relative'}
      >
        <Flex 
          h={'100%'}
          justify={'end'}
          align={'flex-end'}
          pb={'10px'}
          position={'absolute'}
        >
          <Text
            fontSize={'8px'}
            fontWeight={'860'}
            lineHeight={'10px'}
            color={'#F9D85E'}
          >
            0%
          </Text>
        </Flex>
        <Indicator>25%</Indicator>
        <Indicator>50%</Indicator>
        <Indicator>75%</Indicator>
        <Indicator>100%</Indicator>
      </HStack>
      <Slider
        mt={'-10px'}
        aria-label='slider-ex-4'
        // defaultValue={year}
        min={1}
        max={100}
        // onChange={(value) => setYear(value)}
      >
        <SliderTrack bg='#493C3C'>
          <SliderFilledTrack  bg='#F9D85E'/>
        </SliderTrack> 
        <SliderThumb boxSize={5} bg='#F9D85E'>
          <Box color='black' as={MdCode} />
        </SliderThumb>
      </Slider>
    </Flex>
  );
}
export default SliderWish;