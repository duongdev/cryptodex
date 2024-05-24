'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { useMedia } from 'react-use'

import { AdBanner } from '@/components/ad-banner'
import { Progress } from '@/components/ui/progress'
import type { ExchangeListResponseDataItem } from '@/lib/api/strapi'
import { MonetizationAdBannerComponent } from '@/lib/api/strapi'
import { REFRESH_INTERVAL } from '@/lib/constants'
import type { CryptoData } from '@/lib/types'

import { CryptoBubbles } from './crypto-bubbles'
import { columns } from './crypto-table/columns'
import { CryptoDataTable } from './crypto-table/crypto-table'

export type RealtimeCryptoWrapperProps = {
  initialCryptos: CryptoData[]
  from?: number
  to?: number
  getCryptoData: () => Promise<CryptoData[]>
  adBanners?: MonetizationAdBannerComponent[]
  exchanges?: ExchangeListResponseDataItem[]
}

export const RealtimeCryptoWrapper: FC<RealtimeCryptoWrapperProps> = ({
  initialCryptos,
  from = 1,
  to: $to,
  getCryptoData,
  adBanners = [],
  exchanges = [],
}) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>(initialCryptos)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())
  const isMobile = useMedia('(max-width: 768px)')

  const to = $to ?? (isMobile ? 50 : 100)
  const topCryptos = cryptos.slice(from - 1, to)

  useEffect(() => {
    const interval = setInterval(async () => {
      setLastUpdatedAt(Date.now())
      getCryptoData().then(setCryptos)
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [getCryptoData])

  const bubbleBanners = adBanners.filter(
    (banner) =>
      banner.placement === MonetizationAdBannerComponent.placement.BUBBLE,
  )
  const belowBubblesBanners = adBanners.filter(
    (banner) =>
      banner.placement === MonetizationAdBannerComponent.placement.BELOW_BUBBLE,
  )

  return (
    <>
      <UpdateProgress
        lastUpdatedAt={lastUpdatedAt}
        updateInterval={REFRESH_INTERVAL}
      />
      <CryptoBubbles
        banners={bubbleBanners}
        className="h-[calc(100dvh-60px)] bg-slate-900 md:h-[calc(100dvh-56px)]"
        cryptos={topCryptos}
      />
      <div
        className="container flex max-w-screen-2xl flex-col gap-4 px-2 pb-8 pt-16 md:-mt-10 md:px-8"
        id="table-wrapper"
      >
        {belowBubblesBanners.length > 0 && (
          <div className="flex w-full flex-col gap-2 md:gap-4">
            {belowBubblesBanners.map((banner) => (
              <AdBanner key={banner.id} banner={banner} className="w-full" />
            ))}
          </div>
        )}
        <CryptoDataTable
          columns={columns}
          data={cryptos}
          exchanges={exchanges}
        />
      </div>
    </>
  )
}

const UpdateProgress: FC<{ lastUpdatedAt: number; updateInterval: number }> = ({
  lastUpdatedAt,
  updateInterval,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastUpdatedAt
      setProgress((elapsed / updateInterval) * 100)
    }, 200)

    return () => clearInterval(interval)
  }, [lastUpdatedAt, updateInterval])

  return (
    <Progress
      className="h-1 rounded-none [&>.indicator]:duration-200"
      value={progress}
    />
  )
}
