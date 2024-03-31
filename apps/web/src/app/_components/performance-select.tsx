'use client'

import type { FC } from 'react'

import { useAtom } from 'jotai'

import { performanceOptionAtom } from '@/atoms/crypto'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PERFORMANCE_OPTIONS } from '@/lib/constants'

export type PerformanceSelectProps = {}

export const PerformanceSelect: FC<PerformanceSelectProps> = () => {
  const [value, setValue] = useAtom(performanceOptionAtom)

  return (
    <Tabs value={value} onValueChange={setValue as (value: string) => void}>
      <TabsList className="bg-card w-auto border">
        {Object.entries(PERFORMANCE_OPTIONS).map(([optionValue, { label }]) => (
          <TabsTrigger
            key={optionValue}
            className="data-[state=active]:bg-muted"
            value={optionValue}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
