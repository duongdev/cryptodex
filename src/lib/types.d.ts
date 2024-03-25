import cryptoData from '../app/_mocks_/crypto.json'
import { Exchange } from './exchanges'

export type CryptoData = (typeof cryptoData)[0] & {
  exchanges?: Exchange[]
}
