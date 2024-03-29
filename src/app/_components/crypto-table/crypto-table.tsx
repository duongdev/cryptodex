'use client'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Fuse from 'fuse.js'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FC, useMemo, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { CRYPTO_TABLE_SIZE } from '@/lib/constants'
import { TableToolbar } from './table-toolbar'
import { CryptoData, Currency } from '@/lib/types'
import { useDebounce } from 'react-use'

const DEBOUNCE_DELAY = 300

interface CryptoDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function CryptoDataTable<TData, TValue>({
  columns,
  data,
}: CryptoDataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchText, setSearchText] = useState('')
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD')
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

  const handleSetPageIndex = (pageIndex: number) => {
    setPageIndex(Math.min(maxPageIndex, Math.max(0, pageIndex)))
    // Scroll to #table-wrapper with 64px top padding
    setTimeout(() => {
      const table = document.getElementById('table-wrapper')
      table?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedExchanges={selectedExchanges}
        onSelectedExchangesChange={setSelectedExchanges}
        selectedCurrency={selectedCurrency}
        onSelectedCurrencyChange={setSelectedCurrency}
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <hr />

        <TablePagination
          pageIndex={pageIndex}
          pageCount={maxPageIndex}
          gotoPage={handleSetPageIndex}
          previousPage={handlePreviousPage}
          nextPage={handleNextPage}
          className="m-4"
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
            className="cursor-pointer"
            key={i}
            onClick={() => gotoPage(i)}
          >
            <PaginationLink isActive={i === pageIndex}>{i + 1}</PaginationLink>
          </PaginationItem>
        ))}
        {pageIndex < pageCount - maxPageItems && (
          <>
            {end < pageCount - 1 && (
              <PaginationItem className="cursor-pointer">
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem
              className="cursor-pointer"
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
