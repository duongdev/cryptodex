import Image from 'next/image'

import type { ExchangeListResponseDataItem } from '@/lib/api/strapi'
import { cn } from '@/lib/utils'
import { track } from '@vercel/analytics/react'

export function ExchangeLogo({
  exchange,
  size = 24,
  className,
}: {
  exchange: ExchangeListResponseDataItem
  size?: number
  className?: string
}) {
  if (!exchange.attributes?.logo.data?.attributes?.url) {
    return null
  }

  const handleClick = () => {
    track('exchange-logo-clicked', {
      exchange: exchange.attributes?.slug ?? null,
      name: exchange.attributes?.name ?? null,
      website: exchange.attributes?.website_link?.external_url ?? null,
    })
  }

  return (
    <Image
      alt={exchange.attributes?.name ?? ''}
      className={cn('shrink-0 rounded-sm', className)}
      height={size}
      onClick={handleClick}
      src={exchange.attributes?.logo.data?.attributes?.url}
      width={size}
    />
  )
}
