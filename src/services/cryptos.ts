'use server'

import { CRYPTO_DATA_URL, REFRESH_INTERVAL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { orderBy } from 'lodash-es'
import { kv } from '@vercel/kv'
import { EXCHANGE_CONFIG } from '@/lib/exchanges'

const CACHE_SECONDS = REFRESH_INTERVAL / 1000

export async function getCryptoData(): Promise<CryptoData[]> {
  let cryptos = await kv.get<CryptoData[]>('cryptos_data')

  if (!cryptos) {
    const response = await fetch(CRYPTO_DATA_URL, {
      next: {
        revalidate: CACHE_SECONDS,
      },
    })
    const data: CryptoData[] = await response.json()

    cryptos = orderBy(data, 'rank', 'asc')

    try {
      await kv.set('cryptos_data', cryptos, {
        ex: CACHE_SECONDS,
        nx: true,
      })
    } catch (error) {
      console.error('Error caching cryptos data', error)
    }
  }

  return cryptos.map((crypto) => {
    const exchanges: any[] = []

    Object.entries(EXCHANGE_CONFIG).forEach(([exchangeId, exchange]) => {
      if (
        (exchange.coins as any as string[]).includes(
          crypto.symbol.toUpperCase(),
        )
      ) {
        exchanges.push(exchangeId)
      }
    })

    return {
      ...crypto,
      exchanges,
    }
  })
}
