import { Header } from './_components/header'
import { RealtimeCryptoWrapper } from './_components/realtime-crypto-wrapper'
import { CRYPTO_DATA_URL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { getCryptoData } from '@/services/cryptos'
import { orderBy } from 'lodash-es'

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
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <RealtimeCryptoWrapper
        getCryptoData={handleGetCryptoData}
        top={parseInt(top)}
        initialCryptos={initialCryptos}
      />
    </div>
  )
}
