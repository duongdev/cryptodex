'use client'

import { REFRESH_INTERVAL } from '@/lib/constants'
import { CryptoData } from '@/lib/types'
import { getCryptoData } from '@/services/cryptos'
import { FC, useEffect, useState } from 'react'
import { CryptoBubbles } from './crypto-bubbles'
import { CryptoDataTable } from './crypto-table/crypto-table'
import { columns } from './crypto-table/columns'
import { Progress } from '@/components/ui/progress'

export type RealtimeCryptoWrapperProps = {
  initialCryptos: CryptoData[]
  top: number
}

export const RealtimeCryptoWrapper: FC<RealtimeCryptoWrapperProps> = ({
  initialCryptos,
  top,
}) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>(initialCryptos)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(async () => {
      setLastUpdatedAt(Date.now())
      getCryptoData(top).then(setCryptos)
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [top])

  return (
    <>
      <UpdateProgress
        lastUpdatedAt={lastUpdatedAt}
        updateInterval={REFRESH_INTERVAL}
      />
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
