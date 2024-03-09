import { last, takeRight } from 'lodash-es'
import { CryptoBubbles } from './_components/crypto-bubbles'
import cryptoData from './_mocks_/crypto.json'

export default function Home() {
  const first100Crypto = cryptoData.slice(0, 100)
  return (
    <div>
      crypto: {cryptoData.length}
      <CryptoBubbles cryptos={takeRight(cryptoData, 100)} />
    </div>
  )
}
