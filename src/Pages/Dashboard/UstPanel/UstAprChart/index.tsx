import React, { useState, useCallback, useMemo, FunctionComponent, useRef,Component, createRef, useEffect } from 'react';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto'

import styled, { DefaultTheme } from 'styled-components';
import { ChartTooltip } from './ChartTooltip';
import Indicator from '../../../../assets/Indicator.svg'

const data = [
  {
    timestamp: 1648939268,
    apr: 38.4,
  },
  {
    timestamp: 1648939268,
    apr: 38.4,
  },
  {
    timestamp: 1648939268,
    apr: 38.4,
  },
  {
    timestamp: 1648939268,
    apr: 38.4,
  },
  {
    timestamp: 1648939268,
    apr: 38.4,
  },      
];


const UstAprChart: FunctionComponent = (props) => {
  let canvasRef = createRef<HTMLCanvasElement>();
  let tooltipRef = createRef<HTMLDivElement>();
  let chart!: Chart;

  
  const createChart = () => {
    chart = new Chart(canvasRef.current!, {
      type: 'line',
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,

            external: ({ chart, tooltip }) => {
              let element = tooltipRef.current!;

              if (tooltip.opacity === 0) {
                element.style.opacity = '0';
                return;
              }

              const div1 = element.querySelector('div:nth-child(2)');
              const div2 = element.querySelector('div:nth-child(3)');
              const div3 = element.querySelector('div:nth-child(1)');
              const hr = element.querySelector('hr');

              if (div1 && div2 && div3) {
                try {
                  const i = tooltip.dataPoints[0].dataIndex;
                  const item = data[i];

                  let datetime = new Date(item.timestamp)
                  div1.innerHTML = `${datetime.toDateString()}`;
                  div2.innerHTML = `${item.apr}%`;

                  let style="border-radius: 50%; background-color: rgb(11, 11, 11); width: 20px; height: 20px; position: absolute; ";
                  style += `top: ${chart.scales.y.height-10}px;`;
                  div3.setAttribute('style', style);
                } catch {}
              }

              if (hr) {
                hr.style.top = chart.scales.y.paddingTop + 'px';
                hr.style.height = chart.scales.y.height + 'px';
              }
              
              element.style.opacity = '1';
              element.style.transform = `translateX(${tooltip.caretX}px)`;
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          x: {
            grid: {
              borderColor: '#434040',
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            // grace: '0%',
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 10,
            backgroundColor: '#F9D85E'
          },
        },
      },
      data: {
        labels: data.map(({ timestamp }) => timestamp.toString()),
        datasets: [
          {
            data: data.map(({ apr }) =>
              apr,
            ),
            borderColor: "#F9D85E",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  useEffect(()=>{
    createChart()
  }, [])
  return (
    <Container style={{height: '300px', marginTop:'30px'}}>
      <canvas ref={canvasRef} />
      <ChartTooltip ref={tooltipRef}>
        <hr />
        <section>
          <div>
            <img src={Indicator} alt="loading" style={{maxWidth:'10px'}}/>
          </div>
          <div
            style={{ backgroundColor: '#0B0B0B' }}
          />
          <div 
            style={{ backgroundColor: '#0B0B0B', marginTop:"50px"}}
          />
         </section>
      </ChartTooltip>

       
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
`;

export default UstAprChart;