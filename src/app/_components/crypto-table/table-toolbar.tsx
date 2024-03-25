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
import { Filter, SearchIcon } from 'lucide-react'
import { FC, useState } from 'react'
import { ExchangeFilter } from '../exchange-filter'
import { EXCHANGE_CONFIG } from '@/lib/exchanges'
import Image from 'next/image'

export type TableToolbarProps = {
  className?: string
}

export const TableToolbar: FC<TableToolbarProps> = ({ className }) => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="relative flex max-w-72 flex-1 shrink-0 items-center">
        <SearchIcon
          size="1.2rem"
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
        />
        <Input
          placeholder="Search cryptocurrency..."
          // value={search}
          // onChange={(event) => setSearch(event.target.value)}
          className="pl-10"
        />
      </div>

      <div>
        <ExchangeFilter
          disabled={!true}
          options={exchangeOptions}
          title="Exchanges"
          selected={selected}
          onSelect={setSelected}
          icon={<Filter className="mr-2 h-4 w-4" />}
        />
      </div>

      {/* <div className="flex-1" /> */}

      <Select value="USD">
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent side="bottom" align="start">
          <SelectGroup>
            <SelectLabel>Select currency</SelectLabel>
            <SelectItem value="USD">USD</SelectItem>
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
