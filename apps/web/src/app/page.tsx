import { getCryptoData } from '@/services/cryptos'

import { Header } from './_components/header'
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
        <TopSelect />
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
