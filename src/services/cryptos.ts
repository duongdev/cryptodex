'use server'

import { CRYPTO_DATA_URL, REFRESH_INTERVAL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { orderBy } from 'lodash-es'
import { kv } from '@vercel/kv'

const CACHE_SECONDS = REFRESH_INTERVAL / 1000

export async function getCryptoData(): Promise<CryptoData[]> {
  const cachedCryptos = await kv.get<CryptoData[]>('cryptos_data')

  if (cachedCryptos) {
    return cachedCryptos
  }

  const response = await fetch(CRYPTO_DATA_URL, {
    next: {
      revalidate: CACHE_SECONDS,
    },
  })
  const data: CryptoData[] = await response.json()

  const cryptos = orderBy(data, 'rank', 'asc')

  try {
    await kv.set('cryptos_data', cryptos, {
      ex: CACHE_SECONDS,
      nx: true,
    })
  } catch (error) {
    console.error('Error caching cryptos data', error)
  }

  return cryptos
}
