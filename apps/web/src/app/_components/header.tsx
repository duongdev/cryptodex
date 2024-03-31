import type { FC, ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

export type HeaderProps = {
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link className="mr-4 hidden items-center md:flex" href="/">
          <Image
            alt="Logo"
            className="cursor-pointer"
            height={32}
            src="/images/logo/logo-base-256x256.png"
            width={32}
          />
          <div className="ml-1 text-lg font-semibold text-[#4D0BDA]">
            <b>Crypto</b>Dex
          </div>
        </Link>

        {children}
      </div>
    </header>
  )
}

Header.displayName = 'Header'
