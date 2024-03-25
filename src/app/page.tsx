import { Header } from './_components/header'
import { RealtimeCryptoWrapper } from './_components/realtime-crypto-wrapper'
import { getCryptoData } from '@/services/cryptos'

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
