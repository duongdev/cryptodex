'use server'

import { kv } from '@vercel/kv'
import { orderBy } from 'lodash-es'

import { getExchangeConfig } from '@/lib/api/exchange'
import { CRYPTO_DATA_URL, REFRESH_INTERVAL } from '@/lib/constants'
import { logger } from '@/lib/logger'
import type { ANY, CryptoData } from '@/lib/types'

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
      logger.error('Error caching cryptos data', error)
    }
  }

  const exchangeConfig = await getExchangeConfig()

  return cryptos.map((crypto) => {
    const exchanges: ANY[] = []

    Object.entries(exchangeConfig).forEach(([exchangeId, exchange]) => {
      if (
        (exchange.coins as ANY as string[]).includes(
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
