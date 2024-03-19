'use client'

import { FC, useMemo } from 'react'

import Highcharts from 'highcharts'
// import * as Bubble from 'highcharts/modules'
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
  HC_more(Highcharts)
}

import { CryptoData } from '../../lib/types'
import { useWindowSize } from 'react-use'
import numeral from 'numeral'

export type CryptoBubblesProps = {
  cryptos: CryptoData[]
  className?: string
}

export const CryptoBubbles: FC<CryptoBubblesProps> = ({
  cryptos,
  className,
}) => {
  const { width, height } = useWindowSize()

  const { minSize, maxSize } = useMemo(() => {
    const s = width * height

    /* For s=1200000, min=50, max=250. Scales the min and max by s */
    const minSize = Math.sqrt((50 * 50 * s) / 1200000)
    const maxSize = Math.sqrt((250 * 250 * s) / 1200000)

    return { minSize, maxSize }
  }, [height, width])

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
          minSize: `${minSize}px`,
          maxSize: `${maxSize}px`,
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
              // scale font size based on value
              const size =
                Math.max(
                  minSize,
                  Math.min(
                    maxSize,
                    (point.value / 100) * (maxSize - minSize) + minSize,
                  ),
                ) * 0.2
              return `
                <div style="text-align: center; width: 100%; display: grid; place-items: center; margin-bottom: 4px">
                  <img src="${point.image}" width="${size + 10}" height="${size + 10}"/>
                </div>
                <div style="font-size: ${size}px">
                  <b>${point.name}</b><br/>${numeral(point.orgValue).format(point.orgValue > 100 ? '0.0' : '0.00')}%
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
          keys: ['name'],
          data: cryptos.map((crypto) => ({
            name: crypto.symbol.toUpperCase(),
            value: Math.round(Math.abs(crypto.performance.d) * 100) / 100,
            orgValue: Math.round(crypto.performance.d * 100) / 100,
            color:
              crypto.performance.d < 0
                ? 'rgb(239, 68, 68)'
                : 'rgb(34, 197, 94)',
            image: crypto.image,
          })),
        },
      ] as any,
    }
  }, [cryptos, maxSize, minSize])

  return (
    <div className={className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: '100%' } }}
      />
    </div>
  )
}

CryptoBubbles.displayName = 'CryptoBubbles'
