import { atom } from 'jotai'

import {
  DEFAULT_CURRENCY,
  DEFAULT_PERFORMANCE_OPTION,
  DEFAULT_TOP,
} from '@/lib/constants'
import type { Exchange } from '@/lib/exchanges'
import type { Currency, PerformanceOption } from '@/lib/types'

export const topCoinFilterAtom = atom(DEFAULT_TOP)
export const exchangeFilterAtom = atom<Exchange[]>([])
export const currencyAtom = atom<Currency>(DEFAULT_CURRENCY)
export const performanceOptionAtom = atom<PerformanceOption>(
  DEFAULT_PERFORMANCE_OPTION,
)
