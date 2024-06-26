'use client'

import type { FC } from 'react'
import { useMemo, useState } from 'react'

import type { ColumnDef, SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Fuse from 'fuse.js'
import { useAtom } from 'jotai'
import { useDebounce } from 'react-use'

import { currencyAtom, exchangeFilterAtom } from '@/atoms/crypto'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { ExchangeListResponseDataItem } from '@/lib/api/strapi'
import { CRYPTO_TABLE_SIZE } from '@/lib/constants'
import type { CryptoData } from '@/lib/types'

import { TableToolbar } from './table-toolbar'

const DEBOUNCE_DELAY = 300

interface CryptoDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  exchanges: ExchangeListResponseDataItem[]
}

export function CryptoDataTable<TData, TValue>({
  columns,
  data,
  exchanges = [],
}: CryptoDataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchText, setSearchText] = useState('')
  const [selectedExchanges] = useAtom(exchangeFilterAtom)
  const [selectedCurrency] = useAtom(currencyAtom)
  const [cryptoData, setCryptoData] = useState(data)

  const CURRENCY_RATE = {
    USD: 1,
    IDR: 1 / 15786.5,
    BTC: (data[0] as CryptoData).price,
  }

  useDebounce(
    () => {
      const filteredByExchanges = selectedExchanges.length
        ? data.filter((d) =>
            (d as CryptoData).exchanges?.some((e) =>
              selectedExchanges.includes(e),
            ),
          )
        : data

      if (!searchText) {
        setCryptoData(filteredByExchanges)
        setPageIndex(0)
      } else {
        const fuse = new Fuse(filteredByExchanges, {
          includeScore: false,
          keys: ['name', 'symbol'],
        })

        setCryptoData(fuse.search(searchText).map((r) => r.item))
        setPageIndex(0)
      }
    },
    DEBOUNCE_DELAY,
    [data, searchText, selectedExchanges],
  )

  const table = useReactTable({
    data: cryptoData,
    columns,
    meta: {
      currency: selectedCurrency,
      currencyRate: CURRENCY_RATE[selectedCurrency],
      exchanges,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: {
        pageSize: CRYPTO_TABLE_SIZE,
        pageIndex,
      },
    },
  })

  const maxPageIndex = table.getPageCount()

  const handleSetPageIndex = (index: number) => {
    setPageIndex(Math.min(maxPageIndex, Math.max(0, index)))
    // Scroll to #table-wrapper with 64px top padding
    setTimeout(() => {
      const tableEl = document.getElementById('table-wrapper')
      tableEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  const handleNextPage = () => {
    handleSetPageIndex(pageIndex + 1)
  }

  const handlePreviousPage = () => {
    handleSetPageIndex(pageIndex - 1)
  }

  return (
    <>
      <TableToolbar
        exchanges={exchanges}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <hr />

        <TablePagination
          className="m-4 mx-auto w-min"
          gotoPage={handleSetPageIndex}
          nextPage={handleNextPage}
          pageCount={maxPageIndex}
          pageIndex={pageIndex}
          previousPage={handlePreviousPage}
        />
      </div>
    </>
  )
}

const TablePagination: FC<{
  pageIndex: number
  pageCount: number
  maxPageItems?: number
  className?: string
  gotoPage: (pageIndex: number) => void
  previousPage: () => void
  nextPage: () => void
}> = ({
  gotoPage,
  nextPage,
  previousPage,
  className,
  pageCount,
  pageIndex,
  maxPageItems = 3,
}) => {
  const paginationItemsWithEllipsisElements = useMemo(() => {
    const items = Array.from({ length: pageCount }, (_, i) => i)
    const start = Math.max(0, pageIndex - maxPageItems)
    const end = Math.min(pageCount, pageIndex + maxPageItems)

    return (
      <>
        {pageIndex > maxPageItems && (
          <>
            <PaginationItem
              className="cursor-pointer"
              onClick={() => gotoPage(0)}
            >
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            {start > 1 && (
              <PaginationItem className="cursor-pointer">
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {items.slice(start, end).map((i) => (
          <PaginationItem
            key={i}
            className="hidden cursor-pointer md:block"
            onClick={() => gotoPage(i)}
          >
            <PaginationLink isActive={i === pageIndex}>{i + 1}</PaginationLink>
          </PaginationItem>
        ))}
        {pageIndex < pageCount - maxPageItems && (
          <>
            {end < pageCount - 1 && (
              <PaginationItem className="hidden cursor-pointer md:block">
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem
              className="hidden cursor-pointer md:block"
              onClick={() => gotoPage(pageCount - 1)}
            >
              <PaginationLink>{pageCount}</PaginationLink>
            </PaginationItem>
          </>
        )}
      </>
    )
  }, [gotoPage, maxPageItems, pageCount, pageIndex])

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem className="cursor-pointer" onClick={previousPage}>
          <PaginationPrevious />
        </PaginationItem>

        {paginationItemsWithEllipsisElements}

        <PaginationItem className="cursor-pointer" onClick={nextPage}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
