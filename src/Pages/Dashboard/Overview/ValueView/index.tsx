import React, { FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Link, Tooltip } from '@chakra-ui/react'

import BlackPanel from '../../../../assets/BlackPanel.svg'
import YellowPanel from '../../../../assets/YellowPanel.svg'
import { useStore, useExchangeRate } from '../../../../store';
import AnimationNumber from '../../../Components/AnimationNumber';
import { floor, floorNormalize } from '../../../../Util';


const ValueView: FunctionComponent = (props) => {
  const { state, dispatch } = useStore();
  const rate = useExchangeRate();

  const history = state.amountHistory;
  const last = history.length - 1;
  const ustAmount = (last >= 0 ? history[last].ust_amount : 0 )+
                + floorNormalize(state.ust_total_rewards);
  const lunaAmount = (last >= 0 ? floor(history[last].luna_amount * rate) : 0)+
                + floorNormalize(state.luna_total_rewards * rate);

  return (
    <VStack mt='28px' spacing={'30px'}  alignItems={'baseline'}>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          <Image src={YellowPanel} w={'15px'} />
          <Tooltip 
            label="Total deposited LUNA & compounded interest Calculated in UST" 
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
          lineHeight={'15px'}
          fontStyle={'italic'}
        >
          $&nbsp;<AnimationNumber value={lunaAmount} />
        </Text>
      </VStack>
      <VStack alignItems={'baseline'}>
        <HStack spacing={'10px'} alignItems={'center'}>
          <Image src={BlackPanel} w={'15px'} />
          <Tooltip 
            label="Total deposited UST & compounded interest" 
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
          lineHeight={'15px'}
          fontStyle={'italic'}
        >
          $&nbsp;<AnimationNumber value={ustAmount} />
        </Text>
      </VStack>
    </VStack>
  );
}
export default ValueView;