import { Strapi } from './generated'

export const strapi = new Strapi({
  BASE: process.env.API_BASE_URL || '',
  HEADERS: {
    Authorization: `Bearer ${process.env.API_READ_TOKEN}`,
  },
})

export * from './generated'
