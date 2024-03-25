import cryptoData from '../app/_mocks_/crypto.json'
import { CURRENCY_SYMBOLS } from './constants'
import { Exchange } from './exchanges'

export type CryptoData = (typeof cryptoData)[0] & {
  exchanges?: Exchange[]
}

export type Currency = keyof typeof CURRENCY_SYMBOLS
