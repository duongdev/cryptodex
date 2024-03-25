'use client'

import { Button } from '@/components/ui/button'
import { Exchange } from '@/lib/exchanges'
import { CryptoData } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import numeral from 'numeral'
import { ExchangeLogo } from '../exchange-logo'

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
    cell: ({ getValue }) =>
      getValue<number>() < 0.005
        ? `$${getValue<number>()}`
        : numeral(getValue<number>()).format('$0,0.0000'),
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
    cell: ({ getValue }) => numeral(getValue()).format('$0.00a').toUpperCase(),
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
    cell: ({ getValue }) => (
      <div className="text-right">
        {numeral(getValue() as string)
          .format('$0.00a')
          .toUpperCase()}
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
      <div className="flex items-center gap-2 w-64">
        {getValue<Exchange[]>().map((exc) => (
          <ExchangeItem key={exc} exchange={exc} />
        ))}
      </div>
    ),
  },
]

function renderPerformance(value: number) {
  const color = value < 0 ? 'text-red-500' : 'text-green-500'
  return (
    <div className={`text-right ${color}`}>
      {numeral(value / 100).format('0,0.00%')}
    </div>
  )
}

function ExchangeItem({ exchange }: { exchange: Exchange }) {
  return <ExchangeLogo exchange={exchange} size={24} />
}
