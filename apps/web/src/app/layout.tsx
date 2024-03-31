import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Provider as JotaiProvider } from 'jotai'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'CryptoDex – Indonesia Crypto Market',
  description: 'Indonesia Crypto Market',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          name="viewport"
        />
        <link href="/images/logo/logo-base-32x32.png" rel="icon" sizes="any" />
      </head>
      <body className={inter.className}>
        <JotaiProvider>{children}</JotaiProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
