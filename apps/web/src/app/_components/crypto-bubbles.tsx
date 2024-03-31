'use client'

import type { FC } from 'react'
import { useEffect, useMemo, useRef } from 'react'

import Highcharts from 'highcharts'
// import * as Bubble from 'highcharts/modules'
import HC_more from 'highcharts/highcharts-more'
import type { HighchartsReactRefObject } from 'highcharts-react-official'
import HighchartsReact from 'highcharts-react-official'
import { useAtom } from 'jotai'
import numeral from 'numeral'
import { useWindowSize } from 'react-use'

import { performanceOptionAtom } from '@/atoms/crypto'
import {
  DEFAULT_PERFORMANCE_OPTION,
  PERFORMANCE_OPTIONS,
} from '@/lib/constants'
import { logger } from '@/lib/logger'

import type { ANY, CryptoData } from '../../lib/types'

if (typeof Highcharts === 'object') {
  HC_more(Highcharts)
}

export type CryptoBubblesProps = {
  cryptos: CryptoData[]
  className?: string
}

export const CryptoBubbles: FC<CryptoBubblesProps> = ({
  cryptos,
  className,
}) => {
  const chartRef = useRef<HighchartsReactRefObject>(null)
  const [performanceOption] = useAtom(performanceOptionAtom)
  const selectedPerformanceOption =
    PERFORMANCE_OPTIONS[performanceOption] ||
    PERFORMANCE_OPTIONS[DEFAULT_PERFORMANCE_OPTION]
  const performanceKey = selectedPerformanceOption.key

  const { width, height } = useWindowSize()

  const { minSize, maxSize } = useMemo(() => {
    const [baseMinSize, baseMaxSize] = selectedPerformanceOption.sizes

    const s = width * height

    /* For s=1200000, min=50, max=250. Scales the min and max by s */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const minSize = Math.sqrt((baseMinSize * baseMinSize * s) / 1200000)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const maxSize = Math.sqrt((baseMaxSize * baseMaxSize * s) / 1200000)

    // const minSize = 20
    // const maxSize = 120

    return { minSize, maxSize }
  }, [height, selectedPerformanceOption.sizes, width])

  const options: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        type: 'packedbubble',
        backgroundColor: 'transparent',
      },
      title: false as ANY,
      tooltip: false as ANY,
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
            click(e) {
              logger.info(e)
            },
          },
          dataLabels: {
            useHTML: true,
            enabled: true,
            animation: !true,
            formatter() {
              // eslint-disable-next-line react/no-this-in-sfc
              const point = this.point as ANY
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
          data: cryptos.map((crypto) => {
            const orgValue =
              Math.round(
                ((crypto.performance as ANY)[performanceKey] as number) * 100,
              ) / 100
            const value = Math.abs(orgValue)

            return {
              name: crypto.symbol.toUpperCase(),
              value,
              orgValue,
              color:
                crypto.performance.d < 0
                  ? 'rgb(239, 68, 68)'
                  : 'rgb(34, 197, 94)',
              image: crypto.image,
            }
          }),
        },
      ] as ANY,
    }
  }, [cryptos, maxSize, minSize, performanceKey])

  useEffect(() => {
    logger.info('redraw chart')
    chartRef.current?.chart?.redraw()
  }, [performanceOption])

  return (
    <div className={className}>
      <HighchartsReact
        containerProps={{ style: { height: '100%' } }}
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  )
}

CryptoBubbles.displayName = 'CryptoBubbles'
