'use client'

import { Input } from '@/components/ui/input'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select-api'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Filter, SearchIcon, X } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import { ExchangeFilter } from '../exchange-filter'
import { EXCHANGE_CONFIG } from '@/lib/exchanges'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Currency } from '@/lib/types'

export type TableToolbarProps = {
  className?: string
  searchText: string
  onSearchTextChange: (text: string) => void
  selectedExchanges: string[]
  onSelectedExchangesChange: (exchanges: string[]) => void
  selectedCurrency: Currency
  onSelectedCurrencyChange: (currency: Currency) => void
}

export const TableToolbar: FC<TableToolbarProps> = ({
  className,
  onSearchTextChange,
  onSelectedCurrencyChange,
  onSelectedExchangesChange,
  searchText,
  selectedCurrency,
  selectedExchanges,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn('flex gap-3', className)}>
      <div className="relative flex max-w-72 flex-1 shrink-0 items-center">
        <SearchIcon
          size="1.2rem"
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
        />
        <Input
          ref={searchInputRef}
          placeholder="Search cryptocurrency..."
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          className="pl-10 pr-10"
        />
        {searchText.length > 0 && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
            onClick={() => {
              onSearchTextChange('')
              searchInputRef.current?.focus()
            }}
          >
            <X size="1rem" />
          </Button>
        )}
      </div>

      <div>
        <ExchangeFilter
          disabled={!true}
          options={exchangeOptions}
          title="Exchanges"
          selected={selectedExchanges}
          onSelect={onSelectedExchangesChange}
          icon={<Filter className="mr-2 h-4 w-4" />}
        />
      </div>

      <Select value={selectedCurrency} onValueChange={onSelectedCurrencyChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent side="bottom" align="start">
          <SelectGroup>
            <SelectLabel>Select currency</SelectLabel>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="IDR">IDR</SelectItem>
            <SelectItem value="BTC">BTC</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export const exchangeOptions = Object.entries(EXCHANGE_CONFIG).map(
  ([key, value]) => ({
    value: key,
    label: value.name,
    icon: ({ className }: { className?: string }) => (
      <Image
        src={value.logo}
        width={16}
        height={16}
        alt={value.name}
        className={cn('overflow-hidden rounded-md', className)}
      />
    ),
  }),
)
