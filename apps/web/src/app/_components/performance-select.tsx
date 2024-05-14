'use client'

import type { FC } from 'react'

import { useAtom } from 'jotai'

import { performanceOptionAtom } from '@/atoms/crypto'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PERFORMANCE_OPTIONS } from '@/lib/constants'
import type { PerformanceOption } from '@/lib/types'
import { cn } from '@/lib/utils'

export type PerformanceSelectProps = {
  className?: string
}

export const PerformanceSelect: FC<PerformanceSelectProps> = ({
  className,
}) => {
  const [value, setValue] = useAtom(performanceOptionAtom)

  return (
    <>
      <Tabs
        className={cn('hidden lg:block', className)}
        value={value}
        onValueChange={setValue as (value: string) => void}
      >
        <TabsList className="bg-card w-auto border">
          {Object.entries(PERFORMANCE_OPTIONS).map(
            ([optionValue, { label }]) => (
              <TabsTrigger
                key={optionValue}
                className="data-[state=active]:bg-muted"
                value={optionValue}
              >
                {label}
              </TabsTrigger>
            ),
          )}
        </TabsList>
      </Tabs>
      <Select
        value={value}
        onValueChange={setValue as (v: PerformanceOption) => void}
      >
        <SelectTrigger className={cn('w-[120px] lg:hidden', className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(PERFORMANCE_OPTIONS).map(
              ([optionValue, { label }]) => (
                <SelectItem key={optionValue} value={optionValue}>
                  {label}
                </SelectItem>
              ),
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
