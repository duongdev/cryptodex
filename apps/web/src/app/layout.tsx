import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Provider as JotaiProvider } from 'jotai'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const fontFamily = DM_Sans({ subsets: ['latin'] })

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'HargaCrypto – Indonesia Crypto Market',
  description: 'Indonesia Crypto Market',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          name="viewport"
        />
        <link href="/images/logo/logo-base-32x32.png" rel="icon" sizes="any" />
      </head>
      <body className={fontFamily.className}>
        <JotaiProvider>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
            storageKey="theme"
          >
            {children}
          </ThemeProvider>
        </JotaiProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
