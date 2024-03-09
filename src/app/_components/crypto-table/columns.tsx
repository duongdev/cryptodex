'use client'

import { Crypto } from '@/app/types'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import numeral from 'numeral'

export const columns: ColumnDef<Crypto>[] = [
  {
    header: '',
    // accessorFn: (row) => ({ rank: row.rank, image: row.image }),
    accessorKey: 'rank',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="min-w-4 text-right">
          {numeral(row.getValue('rank')).format('0,0')}
        </div>
        <Image
          src={row.original.image}
          width={32}
          height={32}
          alt={row.original.symbol}
        />
      </div>
    ),
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Price',
    accessorFn: (row) => numeral(row.price).format('$0,0.0000'),
  },
  {
    header: 'Market Cap',
    accessorFn: (row) => numeral(row.marketCap).format('$0.00a').toUpperCase(),
  },
  {
    id: 'volume',
    header: () => <div className="text-right">Volume</div>,
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
    header: () => <div className="text-right">Hour</div>,
    accessorKey: 'performance.h',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'day',
    header: () => <div className="text-right">Day</div>,
    accessorKey: 'performance.d',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'week',
    header: () => <div className="text-right">Week</div>,
    accessorKey: 'performance.w',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'month',
    header: () => <div className="text-right">Month</div>,
    accessorKey: 'performance.m',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
  {
    id: 'year',
    header: () => <div className="text-right">Year</div>,
    accessorKey: 'performance.y',
    cell: ({ getValue }) => renderPerformance(getValue() as number),
  },
]

function renderPerformance(value: number) {
  const color = value < 0 ? 'text-red-500' : 'text-green-500'
  return (
    <div className={`text-right ${color}`}>
      {numeral(value / 100).format('0.00%')}
    </div>
  )
}
