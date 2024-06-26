export const REFRESH_INTERVAL = +(
  process.env.NEXT_PUBLIC_REFRESH_INTERVAL || 10000
)
export const CRYPTO_DATA_URL = 'https://data.banterbubbles.com/files/1.usd.json'
export const CRYPTO_TABLE_SIZE = 100

export const DEFAULT_TOP = 100
export const CURRENCY_SYMBOLS = {
  USD: '$',
  IDR: 'Rp',
  BTC: '₿',
}
export const DEFAULT_CURRENCY = 'USD'

export const PERFORMANCE_OPTIONS = {
  year: {
    key: 'y',
    label: 'Year',
    sizes: [30, 120],
  },
  month: {
    key: 'm',
    label: 'Month',
    sizes: [30, 150],
  },
  week: {
    key: 'w',
    label: 'Week',
    sizes: [60, 180],
  },
  day: {
    key: 'd',
    label: 'Today',
    sizes: [50, 250],
  },
  hour: {
    key: 'h',
    label: 'Hour',
    sizes: [75, 300],
  },
} as const
export const DEFAULT_PERFORMANCE_OPTION: keyof typeof PERFORMANCE_OPTIONS =
  'day'

export const BUBBLE_OPTIONS = {
  baseSquareSize: 1200000,
  layoutAlgorithm: {
    splitSeries: false,
    gravitationalConstant: 0.01,
    maxSpeed: 0.25,
    friction: -0.981,
    initialPositionRadius: 250,
    initialPositions: 'random',
    enableSimulation: true,
    maxIterations: 2000,
  },
  minOpacity: 0.4,
  maxOpacity: 1,
  filteredOutOpacity: 0.1,
  positiveColor: '37, 255, 117',
  negativeColor: '251, 17, 17',
} as const
