import type { SiteConfigResponse } from './strapi'
import { strapi } from './strapi'

export async function getSiteConfig() {
  const siteConfig = await strapi.siteConfig.getSiteConfig({
    populate: 'deep,4',
  })

  return siteConfig
}

export async function getHeaderNavItems(siteConfig?: SiteConfigResponse) {
  if (!siteConfig) {
    // eslint-disable-next-line no-param-reassign
    siteConfig = await getSiteConfig()
  }
  const headerNavItems = siteConfig.data?.attributes?.header_nav ?? []

  return headerNavItems
}
