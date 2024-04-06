'use client'

import type { FC } from 'react'

import { track } from '@vercel/analytics/react'
import Image from 'next/image'

import type { MonetizationAdBannerComponent } from '@/lib/api'
import { cn } from '@/lib/utils'

import { DynamicLink } from './dynamic-link'

export type AdBannerProps = {
  banner: MonetizationAdBannerComponent
  className?: string
}

export const AdBanner: FC<AdBannerProps> = ({ banner, className }) => {
  const { link } = banner

  const handleAdBannerClick = () => {
    track('ad-banner-clicked', {
      id: banner.id ?? null,
      metadata: banner.track_metadata ?? null,
      title: banner.title_en ?? 'untitled',
      url: link?.external_url ?? null,
      placement: banner.placement ?? null,
    })
  }

  const image = (
    <Image
      className={cn(className, banner.custom_class_name)}
      height={banner.height}
      src={banner.medium?.data?.attributes?.url!}
      title={banner.title_en}
      width={banner.width}
      alt={
        banner.medium?.data?.attributes?.alternativeText ||
        banner.title_en ||
        'Below Bubbles Banner'
      }
      onClick={handleAdBannerClick}
    />
  )

  if (!link) {
    return image
  }

  return <DynamicLink link={link}>{image}</DynamicLink>
}
