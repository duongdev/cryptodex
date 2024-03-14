import { Header } from './_components/header'
import { getCryptoData } from '@/services/cryptos'
import { RealtimeCryptoWrapper } from './_components/realtime-crypto-wrapper'

export default async function Home({
  searchParams: { top = '100' },
}: {
  searchParams: { top?: string }
}) {
  const initialCryptos = await getCryptoData(parseInt(top))

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <RealtimeCryptoWrapper
        initialCryptos={initialCryptos}
        top={parseInt(top)}
      />
    </div>
  )
}
