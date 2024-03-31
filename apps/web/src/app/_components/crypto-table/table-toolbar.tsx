'use client'

import type { FC } from 'react'
import { useRef } from 'react'

import { Filter, SearchIcon, X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EXCHANGE_CONFIG } from '@/lib/exchanges'
import type { Currency } from '@/lib/types'
import { cn } from '@/lib/utils'

import { ExchangeFilter } from '../exchange-filter'

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
          className="text-muted-foreground absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transform"
          size="1.2rem"
        />
        <Input
          className="pl-10 pr-10"
          placeholder="Search cryptocurrency..."
          ref={searchInputRef}
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
        {searchText.length > 0 && (
          <Button
            className="text-muted-foreground absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transform"
            size="icon"
            variant="ghost"
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
          icon={<Filter className="mr-2 h-4 w-4" />}
          options={exchangeOptions}
          selected={selectedExchanges}
          title="Exchanges"
          onSelect={onSelectedExchangesChange}
        />
      </div>

      <Select value={selectedCurrency} onValueChange={onSelectedCurrencyChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent align="start" side="bottom">
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

// eslint-disable-next-line react-refresh/only-export-components
export const exchangeOptions = Object.entries(EXCHANGE_CONFIG).map(
  ([key, value]) => ({
    value: key,
    label: value.name,
    icon: ({ className }: { className?: string }) => (
      <Image
        alt={value.name}
        className={cn('overflow-hidden rounded-md', className)}
        height={16}
        src={value.logo}
        width={16}
      />
    ),
  }),
)
