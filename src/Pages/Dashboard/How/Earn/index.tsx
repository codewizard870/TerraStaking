import React, { useState, FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Box, Center, Divider, Slider, SliderTrack, SliderThumb } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";

import { MdCode, MdArrowDropDownCircle } from "react-icons/md";
import { 
  useUSTDeposited, 
  useLUNADeposited, 
  useUSTPrice, 
  useLUNAPrice, 
  useUSTApr, 
  useLUNAApr 
} from '../../../../store';

interface Props {
  setTotal: Dispatch<SetStateAction<number>>,
}
const Earn: FunctionComponent<Props> = ({setTotal}) => {
  const [dnom, setDnom] = useState('LUNA');
  const [year, setYear] = useState(10);

  const ustDeposited = useUSTDeposited();
  const lunaDeposited = useLUNADeposited();

  const ustPrice = useUSTPrice();
  const lunaPrice = useLUNAPrice();
  const value = Math.floor(dnom == 'LUNA' ? lunaDeposited * lunaPrice / ustPrice : ustDeposited);

  const ustApr = useUSTApr();
  const lunaApr = useLUNAApr();
  const apr = dnom == 'LUNA' ? lunaApr : ustApr;

  setTotal(Math.floor(value * apr / 100 * year));

  return (
    <VStack
      mt={'55px'}
      width={{ sm: '100%', md: '200px', lg: '254px' }}
      minWidth={{ sm: '0px', md: '200px', lg: '254px' }}
      align={'baseline'}
    >
      <Flex
        justify={'space-between'}
        w={'100%'}
      >
        <Text
          fontSize={'20px'}
          fontWeight={'860'}
          lineHeight={'24px'}
        >
          {dnom}
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            background={'none'}
            w={'20px'}
            h={'20px'}
            _hover={{ bg: 'none', color: '#F9D85E' }}
            _expanded={{ bg: 'none' }}
            _focus={{ bg: 'none', color: '#F9D85E' }}
            _active={{ bg: 'none' }}
          >
            <MdArrowDropDownCircle />
          </MenuButton>
          <MenuList background={'black'} borderColor={'black'} p={'0px'} w={'100px'} minWidth={'0px'}>
            <MenuItem
              onClick={() => setDnom("LUNA")}
              _hover={{ bg: '#212121', color: '#F9D85E' }}
              _focus={{ bg: '#212121', color: 'white' }}
            >
              LUNA
            </MenuItem>
            <MenuItem
              onClick={() => setDnom("UST")}
              _hover={{ bg: '#212121', color: '#F9D85E' }}
            >
              UST
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Divider orientation='horizontal' />
      <Text
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'10px'}
      >
        Your Deposit
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
      >
        {value.toLocaleString()}
      </Text>
      <Divider orientation='horizontal' />
      <Text
        fontSize={'9px'}
        fontWeight={'860'}
        lineHeight={'10px'}
      >
        Amount in UST
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'860'}
        lineHeight={'24px'}
        pt={'30px'}
      >
        {year} Years
      </Text>
      <Slider
        aria-label='slider-ex-4'
        defaultValue={year}
        min={1}
        max={10}
        onChange={(value) => setYear(value)}
      >
        <SliderTrack bg='#F9D85E' />
        <SliderThumb boxSize={6} bg='#F9D85E'>
          <Box color='black' as={MdCode} />
        </SliderThumb>
      </Slider>
    </VStack>
  );
}
export default Earn;