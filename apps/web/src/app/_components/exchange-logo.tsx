import Image from 'next/image'

import type { Exchange } from '@/lib/exchanges'
import { EXCHANGE_CONFIG } from '@/lib/exchanges'
import { cn } from '@/lib/utils'

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
      alt={exchange}
      className={cn('shrink-0 rounded-sm', className)}
      height={size}
      src={exchangeConfig.logo}
      width={size}
    />
  )
}
