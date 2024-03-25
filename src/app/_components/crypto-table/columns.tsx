'use client'

import { Button } from '@/components/ui/button'
import { EXCHANGE_CONFIG, Exchange } from '@/lib/exchanges'
import { CryptoData, Currency } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import numeral from 'numeral'
import { ExchangeLogo } from '../exchange-logo'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const CURRENCY_SYMBOLS = {
  USD: '$',
  IDR: 'Rp ',
  BTC: '₿',
}

export const columns: ColumnDef<CryptoData>[] = [
  {
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="-mx-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Rank
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'rank',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <div className="min-w-20 shrink-0 text-right">
          {numeral(row.getValue('rank')).format('0,0')}
        </div>
        <Image
          src={row.original.image}
          width={32}
          height={32}
          alt={row.original.symbol}
          className="h-8 w-8 shrink-0"
        />
      </div>
    ),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-mx-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'name',
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-mx-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'price',
    // accessorFn: (row) => numeral((row.price)).format('$0,0.0000'),
    cell: ({ getValue, table }) => (
      <div className="whitespace-nowrap">
        {getValue<number>() < 0.005
          ? `${(CURRENCY_SYMBOLS as any)[getTableMeta(table).currency]}${getValue<number>() / getTableMeta(table).currencyRate}`
          : getConvertedAmount({
              value: getValue<number>(),
              currency: getTableMeta(table).currency,
              rate: getTableMeta(table).currencyRate,
              format: '0,0.0000',
            })}
      </div>
    ),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-mx-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Market Cap
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'marketCap',
    // cell: ({ getValue }) => numeral(getValue()).format('$0.00a').toUpperCase(),
    cell: ({ getValue, table }) => (
      <div className="whitespace-nowrap">
        {getConvertedAmount({
          value: getValue<number>(),
          currency: getTableMeta(table).currency,
          rate: getTableMeta(table).currencyRate,
          format: '0.00a',
        })}
      </div>
    ),
  },
  {
    id: 'volume',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="-mx-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Volume
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'volume',
    cell: ({ getValue, table }) => (
      <div className="whitespace-nowrap text-right">
        {getConvertedAmount({
          value: getValue() as number,
          format: '0.00a',
          rate: getTableMeta(table).currencyRate,
          currency: getTableMeta(table).currency,
        })}
      </div>
    ),
  },
  {
    id: 'hour',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="-mx-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Hour
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'performance.h',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'day',

    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="-mx-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Day
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'performance.d',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'week',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="-mx-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Week
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'performance.w',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'month',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="-mx-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Month
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'performance.m',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'year',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="-mx-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Year
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    accessorKey: 'performance.y',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    accessorKey: 'exchanges',
    header: 'Exchanges',
    cell: ({ getValue }) => (
      <TooltipProvider>
        <div className="flex w-64 items-center gap-2">
          {getValue<Exchange[]>().map((exc) => (
            <ExchangeItem key={exc} exchange={exc} />
          ))}
        </div>
      </TooltipProvider>
    ),
  },
]

const getTableMeta = (table: any) => ({
  currency:
    (table.options.meta.currency as Currency) || 'USD',
  currencyRate: (table.options.meta.currencyRate as number) || 1,
})

function getConvertedAmount({
  value,
  currency = 'USD',
  rate = 1,
  format = '0,0.00',
}: {
  value: number
  currency?: Currency
  rate?: number
  format?: string
}) {
  const convertedValue = value / rate
  const formattedValue = numeral(convertedValue).format(format).toUpperCase()
  return `${CURRENCY_SYMBOLS[currency]}${formattedValue}`
}

function renderPerformance(value: number) {
  const color = value < 0 ? 'text-red-500' : 'text-green-500'
  return (
    <div className={`text-right ${color}`}>
      {numeral(value / 100).format('0,0.00%')}
    </div>
  )
}

function ExchangeItem({ exchange }: { exchange: Exchange }) {
  const exchangeConfig = EXCHANGE_CONFIG[exchange]

  return (
    <Tooltip>
      <TooltipTrigger>
        <ExchangeLogo exchange={exchange} size={24} />
      </TooltipTrigger>
      <TooltipContent>
        <p>{exchangeConfig.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
