'use server'

import { CRYPTO_DATA_URL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { orderBy } from 'lodash-es'

export async function getCryptoData(): Promise<CryptoData[]> {
  const response = await fetch(CRYPTO_DATA_URL)
  const data: CryptoData[] = await response.json()

  const cryptos = orderBy(data, 'rank', 'asc')

  return cryptos
  
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/cryptos`
    const response = await fetch(url)
    const data: CryptoData[] = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    return []
  }
}
