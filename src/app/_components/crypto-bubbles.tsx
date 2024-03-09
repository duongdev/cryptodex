'use client'

import { FC, useMemo } from 'react'

import Highcharts from 'highcharts'
// import * as Bubble from 'highcharts/modules'
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
  HC_more(Highcharts)
}

import { Crypto } from '../types'

export type CryptoBubblesProps = {
  cryptos: Crypto[]
  className?: string
}

export const CryptoBubbles: FC<CryptoBubblesProps> = ({ cryptos, className }) => {
  const options: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        type: 'packedbubble',
        backgroundColor: 'transparent',
      },
      title: false as any,
      tooltip: false as any,
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        packedbubble: {
          draggable: true,
          cursor: 'pointer',
          animation: !true,
          minSize: '50px',
          maxSize: '250px',
          zMin: 0,
          zMax: 100,
          layoutAlgorithm: {
            splitSeries: false,
            gravitationalConstant: 0.01,
            maxSpeed: 0.5,
            friction: 0.9,
            initialPositionRadius: 100,
            initialPositions: 'circle',
            enableSimulation: true,
            // bubblePadding: 20
          },
          events: {
            click: function (e) {
              console.log(e)
            },
          },
          dataLabels: {
            useHTML: true,
            enabled: true,
            animation: !true,
            formatter: function () {
              const point = this.point as any
              // scale font size from 10px to 40px based on value
              const size = (point.value / 100) * 50 + 10
              return `
                <div style="text-align: center; width: 100%; display: grid; place-items: center; margin-bottom: 4px">
                  <img src="${point.image}" width="${size + 10}" height="${size + 10}"/>
                </div>
                <div style="font-size: ${size}px">
                  <b>${point.name}</b><br/>${point.valueOrg}%
                </div>
              `
            },
            style: {
              color: 'white',
              textOutline: 'none',
              fontWeight: 'normal',
              textAlign: 'center',
            },
          },
        },
      },
      series: [
        {
          data: cryptos.map((crypto) => ({
            name: crypto.symbol.toUpperCase(),
            value: Math.round(Math.abs(crypto.performance.d) * 100) / 100,
            valueOrg: Math.round(crypto.performance.d * 100) / 100,
            color: crypto.performance.d < 0 ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)',
            image: crypto.image,
          })),
        },
      ] as any,
    }
  }, [cryptos])

  return (
    <div className={className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: '100%'} }}
      />
    </div>
  )
}

CryptoBubbles.displayName = 'CryptoBubbles'
