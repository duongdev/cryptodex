import { CRYPTO_DATA_URL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'

export async function getCryptoData(top = 100): Promise<CryptoData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/cryptos?top=${top}`,
  )
  const data: CryptoData[] = await response.json()

  return data
}
