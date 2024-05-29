import { keyBy } from "lodash-es"
import { strapi } from "./strapi"

export async function getExchanges() {
  const { data = [] } = await strapi.exchange.getExchanges({
    populate: 'deep,4',
  })

  return data
}

export async function getExchangeConfig() {
  const exchanges = await getExchanges()

  return keyBy(exchanges.map((exchange) => exchange.attributes!), 'slug')
}