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

import { exchangeFilterAtom, performanceOptionAtom } from '@/atoms/crypto'
import { useTrackBannerClick } from '@/components/ad-banner'
import type { MonetizationAdBannerComponent } from '@/lib/api'
import {
  BUBBLE_OPTIONS,
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
  banners?: MonetizationAdBannerComponent[]
  className?: string
}

export const CryptoBubbles: FC<CryptoBubblesProps> = ({
  cryptos,
  banners = [],
  className,
}) => {
  const trackBannerClick = useTrackBannerClick()
  const chartRef = useRef<HighchartsReactRefObject>(null)
  const [selectedExchanges] = useAtom(exchangeFilterAtom)
  const [performanceOption] = useAtom(performanceOptionAtom)
  const selectedPerformanceOption =
    PERFORMANCE_OPTIONS[performanceOption] ||
    PERFORMANCE_OPTIONS[DEFAULT_PERFORMANCE_OPTION]
  const performanceKey = selectedPerformanceOption.key

  const { width, height } = useWindowSize()

  const maxAbsValue = useMemo(() => {
    return Math.max(
      ...cryptos.map((crypto) =>
        Math.abs((crypto.performance as ANY)[performanceKey] as number),
      ),
    )
  }, [cryptos, performanceKey])
  const minNegativeValue = useMemo(() => {
    return Math.min(
      ...cryptos
        .filter((crypto) => (crypto.performance as ANY)[performanceKey] < 0)
        .map((crypto) => (crypto.performance as ANY)[performanceKey]),
    )
  }, [cryptos, performanceKey])
  const maxNegativeValue = useMemo(() => {
    return Math.max(
      ...cryptos
        .filter((crypto) => (crypto.performance as ANY)[performanceKey] < 0)
        .map((crypto) => (crypto.performance as ANY)[performanceKey]),
    )
  }, [cryptos, performanceKey])
  const minPositiveValue = useMemo(() => {
    return Math.min(
      ...cryptos
        .filter((crypto) => (crypto.performance as ANY)[performanceKey] > 0)
        .map((crypto) => (crypto.performance as ANY)[performanceKey]),
    )
  }, [cryptos, performanceKey])
  const maxPositiveValue = useMemo(() => {
    return Math.max(
      ...cryptos
        .filter((crypto) => (crypto.performance as ANY)[performanceKey] > 0)
        .map((crypto) => (crypto.performance as ANY)[performanceKey]),
    )
  }, [cryptos, performanceKey])

  const { minSize, maxSize } = useMemo(() => {
    const [baseMinSize, baseMaxSize] = selectedPerformanceOption.sizes

    const s = width * height

    /* For s=1200000, min=50, max=250. Scales the min and max by s */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const minSize = Math.sqrt(
      (baseMinSize * baseMinSize * s) / BUBBLE_OPTIONS.baseSquareSize,
    )
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const maxSize = Math.sqrt(
      (baseMaxSize * baseMaxSize * s) / BUBBLE_OPTIONS.baseSquareSize,
    )

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
          layoutAlgorithm: BUBBLE_OPTIONS.layoutAlgorithm,
          events: {
            click(e) {
              const point = e.point as ANY
              if (!point?.options?.banner) {
                return
              }
              if (typeof point?.options?.link === 'string') {
                trackBannerClick(point.options?.banner)
                window.open(point?.options?.link, '_blank')
              }
            },
          },
          dataLabels: {
            useHTML: true,
            enabled: true,
            animation: !true,
            formatter() {
              // eslint-disable-next-line react/no-this-in-sfc
              const point = this.point as ANY
              const isBanner = !!point.options?.banner
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
                  <b>${point.name}</b>
                  ${isBanner ? '' : `<br/>${numeral(point.orgValue).format(point.orgValue > 100 ? '0.0' : '0.00')}%`}
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
          data: [
            ...cryptos.map((crypto) => {
              const orgValue =
                Math.round(
                  ((crypto.performance as ANY)[performanceKey] as number) * 100,
                ) / 100
              const value = Math.abs(orgValue)
              const isInExchangeFilter =
                selectedExchanges.length === 0 ||
                crypto.exchanges?.some((exchange) =>
                  selectedExchanges.includes(exchange),
                )

              const {
                minOpacity,
                maxOpacity,
                filteredOutOpacity,
                positiveColor,
                negativeColor,
              } = BUBBLE_OPTIONS

              // scale opacity based on value
              // if value is negative, scale based on minNegativeValue and maxNegativeValue
              // if value is positive, scale based on minPositiveValue and maxPositiveValue
              const opacity =
                (!isInExchangeFilter && filteredOutOpacity) ||
                (value < 0
                  ? minOpacity +
                    ((Math.abs(orgValue) - minNegativeValue) /
                      (maxNegativeValue - minNegativeValue)) *
                      (maxOpacity - minOpacity)
                  : minOpacity +
                    ((Math.abs(orgValue) - minPositiveValue) /
                      (maxPositiveValue - minPositiveValue)) *
                      (maxOpacity - minOpacity))

              return {
                name: crypto.symbol.toUpperCase(),
                value,
                orgValue,
                image: crypto.image,
                color:
                  crypto.performance.d < 0
                    ? `rgba(${negativeColor}, ${opacity})`
                    : `rgba(${positiveColor}, ${opacity})`,
              }
            }),
            ...banners.map((banner) => ({
              banner,
              name: banner.title_en,
              image: banner.medium?.data?.attributes?.url,
              color: 'rgb(77 11 218 / 1)',
              value: maxAbsValue * 1.25,
              link: banner.link?.external_url,
            })),
          ],
        },
      ] as ANY,
    }
  }, [
    banners,
    cryptos,
    maxAbsValue,
    maxNegativeValue,
    maxPositiveValue,
    maxSize,
    minNegativeValue,
    minPositiveValue,
    minSize,
    performanceKey,
    selectedExchanges,
    trackBannerClick,
  ])

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
