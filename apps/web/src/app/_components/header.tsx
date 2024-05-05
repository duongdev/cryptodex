import type { FC, ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { DynamicLink } from '@/components/dynamic-link'
import { Button } from '@/components/ui/button'
import type { NavigationAppBarNavComponent } from '@/lib/api/strapi'

export type HeaderProps = {
  children?: ReactNode
  headerNavItems?: NavigationAppBarNavComponent[]
}

export const Header: FC<HeaderProps> = async ({
  children,
  headerNavItems = [],
}) => {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center px-2 md:px-8">
        <Link className="mr-4 flex shrink-0 items-center md:flex" href="/">
          <Image
            alt="Logo"
            className="cursor-pointer"
            height={32}
            src="/images/logo/logo-base-256x256.png"
            width={32}
          />
          <div className="text-primary ml-1 hidden text-lg font-semibold md:block">
            <b>Harga</b>Crypto
          </div>
        </Link>

        {children}

        <nav className="ml-auto flex gap-0">
          {headerNavItems.map((item) => (
            <Button key={item.id} asChild variant="ghost">
              <DynamicLink
                className="opacity-80 transition-opacity hover:opacity-100"
                link={item.link!}
              >
                {item.label_en}
              </DynamicLink>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}

Header.displayName = 'Header'
