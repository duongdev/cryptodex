'use client'

import type { FC } from 'react'
import { useRef } from 'react'

import { useAtom } from 'jotai'
import { Filter, SearchIcon, X } from 'lucide-react'

import { currencyAtom } from '@/atoms/crypto'
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
import type { ExchangeListResponseDataItem } from '@/lib/api/generated'
import type { ANY } from '@/lib/types'
import { cn } from '@/lib/utils'

import { ExchangeFilter } from '../exchange-filter'

export type TableToolbarProps = {
  className?: string
  searchText: string
  exchanges: ExchangeListResponseDataItem[]
  onSearchTextChange: (text: string) => void
}

export const TableToolbar: FC<TableToolbarProps> = ({
  className,
  onSearchTextChange,
  searchText,
  exchanges,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [selectedCurrency, onSelectedCurrencyChange] = useAtom(currencyAtom)

  return (
    <div className={cn('flex gap-2 md:gap-3', className)}>
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
          exchanges={exchanges}
          icon={<Filter className="mr-2 h-4 w-4" />}
          title="Exchanges"
        />
      </div>

      <Select
        value={selectedCurrency}
        onValueChange={onSelectedCurrencyChange as ANY}
      >
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
