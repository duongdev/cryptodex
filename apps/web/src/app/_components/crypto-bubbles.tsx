'use client'

import type { FC } from 'react'
import { useEffect, useMemo, useRef } from 'react'

import Highcharts from 'highcharts'
// import * as Bubble from 'highcharts/modules'
import HC_more from 'highcharts/highcharts-more'
import type { HighchartsReactRefObject } from 'highcharts-react-official'
import HighchartsReact from 'highcharts-react-official'
import { useAtom } from 'jotai'
import { ChevronsDown, Filter } from 'lucide-react'
import numeral from 'numeral'
import { useWindowSize, useMeasure, useMedia } from 'react-use'

import { exchangeFilterAtom, performanceOptionAtom } from '@/atoms/crypto'
import { useTrackBannerClick } from '@/components/ad-banner'
import { Button } from '@/components/ui/button'
import type {
  ExchangeListResponseDataItem,
  MonetizationAdBannerComponent,
} from '@/lib/api/strapi'
import {
  BUBBLE_OPTIONS,
  DEFAULT_PERFORMANCE_OPTION,
  PERFORMANCE_OPTIONS,
} from '@/lib/constants'
import { logger } from '@/lib/logger'
import { cn } from '@/lib/utils'

import type { ANY, CryptoData } from '../../lib/types'

import { ExchangeFilter } from './exchange-filter'
import { PerformanceSelect } from './performance-select'
import { TopSelect } from './top-select'

if (typeof Highcharts === 'object') {
  HC_more(Highcharts)
}

export type CryptoBubblesProps = {
  cryptos: CryptoData[]
  banners?: MonetizationAdBannerComponent[]
  exchanges: ExchangeListResponseDataItem[]
  className?: string
}

export const CryptoBubbles: FC<CryptoBubblesProps> = ({
  cryptos,
  banners = [],
  exchanges,
  className,
}) => {
  const isMobile = useMedia('(max-width: 768px)')
  const trackBannerClick = useTrackBannerClick()
  const chartRef = useRef<HighchartsReactRefObject>(null)
  const [selectedExchanges] = useAtom(exchangeFilterAtom)
  const [performanceOption] = useAtom(performanceOptionAtom)
  const selectedPerformanceOption =
    PERFORMANCE_OPTIONS[performanceOption] ||
    PERFORMANCE_OPTIONS[DEFAULT_PERFORMANCE_OPTION]
  const performanceKey = selectedPerformanceOption.key
  // const performanceKey = 'y'

  const { width: ww, height: wh } = useWindowSize()
  const [ref, { width: mw, height: mh }] = useMeasure<HTMLDivElement>()

  const width = mw || ww
  const height = mh || wh

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

  const bubbleSizes = useMemo(() => {
    const bubbleValues = cryptos.map((crypto) => ({
      symbol: crypto.symbol,
      value: Math.abs((crypto.performance as ANY)[performanceKey] as number),
    }))

    // Constants
    const minSize = isMobile ? 28 : 30 // Min size is 30 pixels
    const maxSizeMultiplier = isMobile ? 2.5 : 3.5 // Max size is 3.5 times the min size
    const chartArea = Math.min(width, height) ** 2 * 0.9

    // Normalize values: Convert each value to a scale where the smallest value is assigned the minSize,
    // and the largest does not exceed maxSizeMultiplier times the minSize.
    let minValue = Math.min(...bubbleValues.map((b) => b.value))
    let maxValue = Math.max(...bubbleValues.map((b) => b.value))

    // Adjust for relative scaling for values >= 200
    const adjustedValues = bubbleValues.map((b) => ({
      symbol: b.symbol,
      value:
        b.value >= 200
          ? 200 + Math.log(b.value + 1 - 200) * (maxValue / 200)
          : b.value,
    }))

    minValue = Math.min(...adjustedValues.map((b) => b.value))
    maxValue = Math.max(...adjustedValues.map((b) => b.value))

    // Calculate total area needed for all bubbles without scaling
    let totalArea = 0
    const baseAreas = adjustedValues.map((b) => {
      const relativeSize = (b.value - minValue) / (maxValue - minValue)
      const diameter =
        minSize + (maxSizeMultiplier * minSize - minSize) * relativeSize
      const area = Math.PI * (diameter / 2) ** 2
      // const area = (diameter) ** 2
      totalArea += area
      return { symbol: b.symbol, area }
    })

    // Scale factor to fit all bubbles within 90% of the chart area
    const scaleFactor = Math.sqrt(chartArea / totalArea)

    // Calculate final sizes
    const sizes: Record<string, number> = {}
    baseAreas.forEach((b) => {
      const diameter = Math.sqrt((b.area * scaleFactor) / Math.PI) * 2 // Reverse area calculation to get diameter
      sizes[b.symbol] = diameter // Assign and round off the diameter
    })

    return sizes
  }, [cryptos, isMobile, width, height, performanceKey])

  const minSize = Math.min(...Object.values(bubbleSizes))
  const maxSize = Math.max(...Object.values(bubbleSizes))

  const options: Highcharts.Options = {
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
        draggable: !isMobile,
        cursor: 'pointer',
        allowPointSelect: !isMobile,
        animation: false,
        minSize,
        maxSize,
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
            // const size =
            //   Math.max(
            //     minSize,
            //     Math.min(
            //       maxSize,
            //       (point.value / 100) * (maxSize - minSize) + minSize,
            //     ),
            //   ) * 0.2
            const size = (isMobile ? 0.175 : 0.2) * point.value
            return `
              <div style="text-align: center; width: 100%; display: grid; place-items: center; margin-bottom: 4px">
                <img src="${point.image}" width="${size + 10}" height="${size + 10}"/>
              </div>
              <div style="font-size: ${size}px">
                <b>${point.name}</b>
                ${isBanner ? '' : `<br/>${numeral(point.orgValue).format((Math.abs(point.orgValue) > 10000 && '0') || (Math.abs(point.orgValue) > 100 && '0.0') || '0.00')}%`}
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

            const size = bubbleSizes[crypto.symbol]

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
              value: size,
              orgValue,
              image: crypto.image,
              color:
                orgValue < 0
                  ? `rgba(${negativeColor}, ${opacity})`
                  : `rgba(${positiveColor}, ${opacity})`,
              size: `${size}px`,
            }
          }),
          ...banners.map((banner) => ({
            banner,
            name: banner.title_en,
            image: banner.medium?.data?.attributes?.url,
            color: 'rgb(77 11 218 / 1)',
            value: maxSize * 0.9,
            link: banner.link?.external_url,
          })),
        ],
      },
    ] as ANY,
  }

  useEffect(() => {
    logger.info('redraw chart')
    chartRef.current?.chart?.redraw()
  }, [performanceOption])

  return (
    <div className={cn('flex flex-col', className)} ref={ref}>
      <HighchartsReact
        containerProps={{ style: { flex: 1 } }}
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <div className="bg-background border-b pt-2 md:hidden">
        <div className="flex items-center justify-center gap-2">
          <PerformanceSelect />
          <TopSelect />
          <ExchangeFilter
            exchanges={exchanges}
            icon={<Filter className="mr-2 h-4 w-4" />}
            title="Exchanges"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            size="icon"
            variant={null}
            onClick={() => {
              const tableEl = document.getElementById('table-wrapper')
              tableEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <ChevronsDown className="animate-bounce" />
          </Button>
        </div>
      </div>
    </div>
  )
}

CryptoBubbles.displayName = 'CryptoBubbles'
