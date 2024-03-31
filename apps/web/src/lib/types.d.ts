import type cryptoData from '../app/_mocks_/crypto.json'

import type { CURRENCY_SYMBOLS, PERFORMANCE_OPTIONS } from './constants'
import type { Exchange } from './exchanges'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ANY = any

export type CryptoData = (typeof cryptoData)[0] & {
  exchanges?: Exchange[]
}

export type Currency = keyof typeof CURRENCY_SYMBOLS
export type PerformanceOption = keyof typeof PERFORMANCE_OPTIONS
