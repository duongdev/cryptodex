import { keyBy } from "lodash-es"
import { strapi } from "./strapi"

export async function getExchangeConfig() {
  const {data = []} = await strapi.exchange.getExchanges({
    populate: 'deep,4',
  })

  const exchanges = keyBy(data.map((exchange) => exchange.attributes!), 'slug')


  return exchanges
}