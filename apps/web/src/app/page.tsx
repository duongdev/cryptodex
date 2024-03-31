import { Filter } from 'lucide-react'

import { getCryptoData } from '@/services/cryptos'

import { exchangeOptions } from './_components/crypto-table/table-toolbar'
import { ExchangeFilter } from './_components/exchange-filter'
import { Header } from './_components/header'
import { PerformanceSelect } from './_components/performance-select'
import { RealtimeCryptoWrapper } from './_components/realtime-crypto-wrapper'
import { TopSelect } from './_components/top-select'

export const dynamic = 'force-dynamic'

export default async function Home({
  searchParams: { top = '100' },
}: {
  searchParams: { top?: string }
}) {
  const initialCryptos = await getCryptoData()

  async function handleGetCryptoData() {
    'use server'

    return getCryptoData()
  }

  return (
    <div className="bg-background relative flex min-h-screen flex-col">
      <Header>
        <div className="flex flex-1 items-center gap-2">
          <PerformanceSelect />
          <TopSelect />
          <ExchangeFilter
            icon={<Filter className="mr-2 h-4 w-4" />}
            options={exchangeOptions}
            title="Exchanges"
          />
        </div>
      </Header>
      <RealtimeCryptoWrapper
        // eslint-disable-next-line react/jsx-no-bind
        getCryptoData={handleGetCryptoData}
        initialCryptos={initialCryptos}
        top={parseInt(top, 10)}
      />
    </div>
  )
}
