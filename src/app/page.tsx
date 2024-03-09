import { orderBy, take } from 'lodash-es'
import { CryptoBubbles } from './_components/crypto-bubbles'
import cryptoData from './_mocks_/crypto.json'
import { Header } from './_components/header'
import { CryptoDataTable } from './_components/crypto-table/crypto-table'
import { columns } from './_components/crypto-table/columns'

const TAKE = 100

export default function Home() {
  const cryptos = take(orderBy(cryptoData, 'rank', 'asc'), TAKE)

  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-8">
      <Header />
      <CryptoBubbles cryptos={cryptos} className="h-[calc(100dvh-56px)]" />
      <div className='container '>
        <CryptoDataTable columns={columns} data={cryptos} />
      </div>
    </div>
  )
}
