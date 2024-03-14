import { CRYPTO_DATA_URL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { getCryptoData } from '@/services/cryptos'
import { orderBy } from 'lodash-es'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const top = parseInt(new URL(request.url).searchParams.get('top') || '100')

  const response = await fetch(CRYPTO_DATA_URL)
  console.log('getCryptoData response', response)
  const data: CryptoData[] = await response.json()
  console.log('getCryptoData data', data)

  const cryptos = orderBy(data, 'rank', 'asc').slice(
    Math.max(0, top - 100),
    top,
  )

  return Response.json(cryptos)
}
