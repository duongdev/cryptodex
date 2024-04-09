'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { AdBanner } from '@/components/ad-banner'
import { Progress } from '@/components/ui/progress'
import type { ExchangeListResponseDataItem } from '@/lib/api'
import { MonetizationAdBannerComponent } from '@/lib/api'
import { REFRESH_INTERVAL } from '@/lib/constants'
import type { CryptoData } from '@/lib/types'

import { CryptoBubbles } from './crypto-bubbles'
import { columns } from './crypto-table/columns'
import { CryptoDataTable } from './crypto-table/crypto-table'

export type RealtimeCryptoWrapperProps = {
  initialCryptos: CryptoData[]
  top: number
  getCryptoData: () => Promise<CryptoData[]>
  adBanners?: MonetizationAdBannerComponent[]
  exchanges?: ExchangeListResponseDataItem[]
}

export const RealtimeCryptoWrapper: FC<RealtimeCryptoWrapperProps> = ({
  initialCryptos,
  top,
  getCryptoData,
  adBanners = [],
  exchanges = [],
}) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>(initialCryptos)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())

  const topCryptos = cryptos.slice(Math.max(0, top - 100), top)

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
        className="h-[calc(100dvh-56px)] bg-slate-900"
        cryptos={topCryptos}
      />
      <div
        className="container -mt-10 flex flex-col gap-4 px-2 pb-8 pt-16 md:px-8"
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
