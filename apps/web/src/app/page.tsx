import { Filter } from 'lucide-react'

import { getHeaderNavItems, getSiteConfig } from '@/lib/api/common'
import { getCryptoData } from '@/services/cryptos'

import { ExchangeFilter } from './_components/exchange-filter'
import { Header } from './_components/header'
import { PerformanceSelect } from './_components/performance-select'
import { RealtimeCryptoWrapper } from './_components/realtime-crypto-wrapper'
import { TopSelect } from './_components/top-select'
import { getExchanges } from '@/lib/api/exchange'

export const dynamic = 'force-dynamic'

export default async function Home({
  searchParams: { top },
}: {
  searchParams: { top?: string }
}) {
  const initialCryptos = await getCryptoData()

  async function handleGetCryptoData() {
    'use server'

    return getCryptoData()
  }

  const siteConfig = await getSiteConfig()
  const headerNavItems = await getHeaderNavItems(siteConfig)
  const adBanners = siteConfig.data?.attributes?.ad_banners ?? []
  const exchanges = await getExchanges()

  return (
    <div className="bg-background relative flex min-h-screen flex-col">
      <Header headerNavItems={headerNavItems}>
        <div className="hidden flex-1 items-center gap-2 md:flex">
          <PerformanceSelect />
          <TopSelect />
          <ExchangeFilter
            icon={<Filter className="mr-2 h-4 w-4" />}
            exchanges={exchanges}
            title="Exchanges"
          />
        </div>
      </Header>
      <RealtimeCryptoWrapper
        adBanners={adBanners}
        exchanges={exchanges}
        from={top ? parseInt(top?.split('-')?.[0] ?? '1', 10) : undefined}
        // eslint-disable-next-line react/jsx-no-bind
        getCryptoData={handleGetCryptoData}
        initialCryptos={initialCryptos}
        to={top ? parseInt(top?.split('-')?.[1] ?? '50', 10) : undefined}
      />
    </div>
  )
}
