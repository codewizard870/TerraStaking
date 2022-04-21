import React, { FunctionComponent } from 'react';
import { HStack, VStack, Flex, Text, Image, Button, Tooltip } from '@chakra-ui/react'

import LunaIcon from "./../../../assets/Luna.svg"
import Warning from "./../../../assets/Warning.svg"
import LunaAprChart from '../AprChart';
import AnimationNumber from '../../Components/AnimationNumber';
import { useStore, OpenDepositModal, useLUNAApr } from '../../../store';

const LunaPanel: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  const data = state.aprLunaHistory;
  const apr = useLUNAApr();

  return (
    <VStack
      w={'100%'}
      px={'62px'}
      py={'39px'}
      background={'#212121'}
      rounded={'25px'}
      align={'center'}
    >
      <HStack spacing={'14px'} w={'100%'}>
        <Image src={LunaIcon} w='56px' />
        <VStack align={'baseline'}>
          <Text
            fontSize={'35px'}
            fontWeight={'800'}
            lineHeight={'36px'}
          >
            LUNA
          </Text>
          <HStack>
            <Text
              fontSize={'13px'}
              fontWeight={'800'}
              lineHeight={'15px'}
            >
              INTEREST
            </Text>
            <Tooltip 
              label="Current annualized deposit rate" 
              background={'#C4C4C4'} 
              color={'black'} hasArrow 
              placement='top-start'
            > 
              <Image src={Warning} />
            </Tooltip>
          </HStack>
        </VStack>
      </HStack>
      <Flex 
        w={'93px'} 
        h={'29px'} 
        style={{marginTop:'52px'}} 
        rounded={'15px'} 
        background={'#493C3C'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'800'}
          lineHeight={'15px'}
        >
          APY
        </Text>
      </Flex>
      <HStack mt={'14px'} align={'baseline'}>
        <Text
          fontSize={'35px'}
          fontWeight={'800'}
          lineHeight={'36px'}      
        >
          <AnimationNumber value={apr} />
        </Text>
        <Text
          fontSize={'20px'}
        >%
        </Text>
      </HStack>
      <LunaAprChart data={data} id={"luna"}/>
      <Button 
        mx={'60px'} 
        h={'45px'} 
        background={'#493C3C'} 
        rounded={'25px'}
        onClick={() => OpenDepositModal(state, dispatch, 'luna')}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'800'}
          lineHeight={'15px'}
        >
          STAKE YOUR LUNA NOW!
        </Text>
      </Button>
    </VStack >
  );
}
export default LunaPanel;