'use client'

import { REFRESH_INTERVAL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { getCryptoData } from '@/services/cryptos'
import { FC, useEffect, useState } from 'react'
import { CryptoBubbles } from './crypto-bubbles'
import { CryptoDataTable } from './crypto-table/crypto-table'
import { columns } from './crypto-table/columns'

export type RealtimeCryptoWrapperProps = {
  initialCryptos: CryptoData[]
  top: number
}

export const RealtimeCryptoWrapper: FC<RealtimeCryptoWrapperProps> = ({
  initialCryptos,
  top,
}) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>(initialCryptos)

  useEffect(() => {
    const interval = setInterval(async () => {
      getCryptoData(top).then(setCryptos)
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [top])

  return (
    <>
      <CryptoBubbles
        cryptos={cryptos}
        className="h-[calc(100dvh-56px)] bg-slate-900"
      />
      <div className="container py-6">
        <CryptoDataTable columns={columns} data={cryptos} />
      </div>
    </>
  )
}
