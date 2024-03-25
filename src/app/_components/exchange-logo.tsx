import { EXCHANGE_CONFIG, Exchange } from '@/lib/exchanges'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function ExchangeLogo({
  exchange,
  size = 24,
  className,
}: {
  exchange: Exchange
  size?: number
  className?: string
}) {
  const exchangeConfig = EXCHANGE_CONFIG[exchange]

  if (!exchangeConfig) {
    return null
  }

  return (
    <Image
      src={exchangeConfig.logo}
      alt={exchange}
      className={cn('shrink-0 rounded-sm', className)}
      height={size}
      width={size}
    />
  )
}
