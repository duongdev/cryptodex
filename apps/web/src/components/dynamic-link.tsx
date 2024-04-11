import type { FC, ReactNode } from 'react'

import Link from 'next/link'

import type { Page } from '@/lib/api/strapi'
import { NavigationAppBarNavComponent } from '@/lib/api/strapi'

export type DynamicLinkProps = {
  link: {
    id?: number
    title_en?: string
    type?: NavigationAppBarNavComponent.type
    external_url?: string
    page?: {
      data?: {
        id?: number
        attributes?: Page
      }
    }
    open_new_tab?: boolean
  }
  children: ReactNode
  className?: string
}

export const DynamicLink: FC<DynamicLinkProps> = ({
  children,
  link,
  className,
}) => {
  const useAnchor = link.open_new_tab || link.external_url?.startsWith('http')

  if (useAnchor) {
    return (
      <a
        key={link.id}
        className={className}
        href={link.external_url}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      aria-label={link.title_en}
      className={className}
      href={
        (link.type === NavigationAppBarNavComponent.type.PAGE &&
          link.page?.data?.attributes?.slug) ||
        link.external_url ||
        '#'
      }
    >
      {children}
    </Link>
  )
}
