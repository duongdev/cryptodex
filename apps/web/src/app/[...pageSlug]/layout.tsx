import type { ReactNode } from 'react'

import { getHeaderNavItems } from '@/lib/api/common'

import { Header } from '../_components/header'

export default async function Layout({ children }: { children: ReactNode }) {
  const headerNavItems = await getHeaderNavItems()
  return (
    <div>
      <Header headerNavItems={headerNavItems} />
      {children}
    </div>
  )
}
