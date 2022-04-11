import React, { FunctionComponent } from 'react';
import { HStack, Stack, Flex, Text, Image, Link } from '@chakra-ui/react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SetStateAction, Dispatch } from 'react';

interface Props{
  data: any
}
const TVLChart: FunctionComponent<Props> = ({data}) => {

  return (
    <Flex w='100%' h='304px'>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          // width={500}
          // height={400}
          data={data}
          // margin={{
          //   top: 10,
          //   right: 30,
          //   left: 0,
          //   bottom: 0,
          // }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A939636" stopOpacity={21}/>
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="name" /> */}
          {/* <YAxis /> */}
          {/* <Tooltip /> */}
          <Area 
            type="monotone" 
            dataKey="totalLiquidityUSD" 
            stroke="#F9D85E" 
            fill="url(#colorUv)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
}
export default TVLChart;