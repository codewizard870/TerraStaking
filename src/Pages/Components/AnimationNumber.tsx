import React, { useState, useEffect, FunctionComponent } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { Flex } from '@chakra-ui/react';
import CountUp from 'react-countup';

interface Props {
  value: number
}
const AnimationNumber: FunctionComponent<Props> = ({ value }) => {
  const [prev, setPrev] = useState(0);
  const [prevRest, setPrevRest] = useState(0);

  useEffect(() => {
    setTimeout(() =>{
      setPrev(value);
      setPrevRest(getRest(value));
    }, 1000);
  }, [value])

  function getRest(num: number){
    return (num * 100 - Math.floor(num) * 100);
  }
  return (
    <span>
      <CountUp start={prev} end={value} separator=',' />
      .
      {getRest(value) < 10 &&
        <span>0</span>
      }
      <CountUp start={prevRest} end={getRest(value)}/>
    </span>
  )
}

export default AnimationNumber;