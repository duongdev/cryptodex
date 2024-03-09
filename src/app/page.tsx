import { takeRight } from 'lodash-es'
import { CryptoBubbles } from './_components/crypto-bubbles'
import cryptoData from './_mocks_/crypto.json'
import { Header } from './_components/header'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <CryptoBubbles
        cryptos={takeRight(cryptoData, 100)}
        className="h-[calc(100dvh-56px)]"
      />
    </div>
  )
}
