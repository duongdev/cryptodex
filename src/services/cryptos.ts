import { CryptoData } from '@/lib/types'

export async function getCryptoData(top = 100): Promise<CryptoData[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/cryptos?top=${top}`
    console.log('getCryptoData url', url)
    const response = await fetch(
      url,
    )
    console.log('getCryptoData response', response)
    const data: CryptoData[] = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    return []
  }
}
