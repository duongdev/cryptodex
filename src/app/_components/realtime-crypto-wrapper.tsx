'use client'

import { REFRESH_INTERVAL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { FC, useEffect, useState } from 'react'
import { CryptoBubbles } from './crypto-bubbles'
import { CryptoDataTable } from './crypto-table/crypto-table'
import { columns } from './crypto-table/columns'
import { Progress } from '@/components/ui/progress'
import { TableToolbar } from './crypto-table/table-toolbar'

export type RealtimeCryptoWrapperProps = {
  initialCryptos: CryptoData[]
  top: number
  getCryptoData: () => Promise<CryptoData[]>
}

export const RealtimeCryptoWrapper: FC<RealtimeCryptoWrapperProps> = ({
  initialCryptos,
  top,
  getCryptoData,
}) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>(initialCryptos)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())

  const topCryptos = cryptos.slice(Math.max(0, top - 100), top)

  useEffect(() => {
    const interval = setInterval(async () => {
      setLastUpdatedAt(Date.now())
      getCryptoData().then(setCryptos)
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [getCryptoData])

  return (
    <>
      <UpdateProgress
        lastUpdatedAt={lastUpdatedAt}
        updateInterval={REFRESH_INTERVAL}
      />
      <CryptoBubbles
        cryptos={topCryptos}
        className="h-[calc(100dvh-56px)] bg-slate-900"
      />
      <div
        id="table-wrapper"
        className="container -mt-10 flex flex-col gap-4 pb-8 pt-16"
      >
        <CryptoDataTable columns={columns} data={cryptos} />
      </div>
    </>
  )
}

const UpdateProgress: FC<{ lastUpdatedAt: number; updateInterval: number }> = ({
  lastUpdatedAt,
  updateInterval,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastUpdatedAt
      setProgress((elapsed / updateInterval) * 100)
    }, 200)

    return () => clearInterval(interval)
  }, [lastUpdatedAt, updateInterval])

  return (
    <Progress
      value={progress}
      className="h-1 rounded-none [&>.indicator]:duration-200"
    />
  )
}
