import React, { FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Link, Tooltip } from '@chakra-ui/react'

import BlackPanel from './../../../../assets/BlackPanel.svg'
import YellowPanel from './../../../../assets/YellowPanel.svg'
import { useStore, useUSTPrice, useLUNAPrice } from '../../../../store';
import { floor, floorNormalize } from '../../../../Util';
const ValueView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const ustPrice = useUSTPrice();
  const lunaPrice = useLUNAPrice();

  const history = state.amountHistory;
  const last = history.length - 1;
  const ustAmount = (last >= 0 ? floor(history[last].ust_amount * ustPrice) : 0 )+
                + floorNormalize(state.ust_total_rewards * ustPrice);
  const lunaAmount = (last >= 0 ? floor(history[last].luna_amount * lunaPrice) : 0)+
                + floorNormalize(state.luna_total_rewards * lunaPrice);

  return (
    <VStack mt='28px' spacing={'14px'}>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          
          <Image src={YellowPanel} w={'15px'} />
          <Tooltip 
            label="Deposited LUNA Calculated in UST" 
            background={'#C4C4C4'} 
            color={'black'} hasArrow 
            placement='top-start'
          > 
            <Text
              fontSize={'20px'}
              fontWeight={'800'}
              lineHeight={'24px'}
            >
              LUNA
            </Text>
          </Tooltip>
        </HStack>
        <Text
          fontSize={'14px'}
          fontWeight={'400'}
          lineHeight={'36px'}
        >
          $&nbsp;{lunaAmount.toLocaleString()}
        </Text>
      </VStack>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          <Image src={BlackPanel} w={'15px'} />
          <Tooltip 
            label="Deposited UST" 
            background={'#C4C4C4'} hasArrow 
            placement='top-start' 
            color={'black'}
          > 
            <Text
              fontSize={'20px'}
              fontWeight={'800'}
              lineHeight={'24px'}
            >
              UST
            </Text>
          </Tooltip>
        </HStack>
        <Text
          fontSize={'14px'}
          fontWeight={'400'}
          lineHeight={'36px'}
        >
          $&nbsp;{ustAmount.toLocaleString()}
        </Text>
      </VStack>
    </VStack>
  );
}
export default ValueView;