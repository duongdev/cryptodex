import { CRYPTO_DATA_URL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { orderBy } from 'lodash-es'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const top = parseInt(new URL(request.url).searchParams.get('top') || '100')

  const response = await fetch(CRYPTO_DATA_URL)
  const data: CryptoData[] = await response.json()

  const cryptos = orderBy(data, 'rank', 'asc').slice(
    Math.max(0, top - 100),
    top,
  )

  return Response.json(cryptos)
}
