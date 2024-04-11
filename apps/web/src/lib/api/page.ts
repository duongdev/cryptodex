import { strapi } from './strapi'

export async function getPage(pageSlug: string) {
  const { data } = await strapi.page.getPages({
    filters: {
      slug: { $eq: pageSlug },
    },
    paginationLimit: 1,
    populate: 'deep,4',
  })

  return data?.[0]?.attributes ?? null
}
