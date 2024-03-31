import Image from 'next/image'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

export type HeaderProps = {
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-4 hidden items-center md:flex">
          <Image
            src="/images/logo/logo-base-256x256.png"
            alt="Logo"
            width={32}
            height={32}
            className="cursor-pointer"
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
