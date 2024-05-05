import { strapi } from './strapi'

export async function getBlogPosts({
  page = 0,
  perPage = 10,
}: { page?: number; perPage?: number } = {}) {
  try {
    const { data, meta } = await strapi.blog.getBlogs({
      populate: 'deep,4',
      paginationPageSize: perPage,
      paginationPage: page,
      sort: 'createdAt:desc',
    })

    const blogs = data ?? []
    const pagination = meta?.pagination ?? {}

    return { blogs, pagination }
  } catch (error) {
    return { blogs: [], pagination: {}, error }
  }
}

export async function getBlogPost({ blogSlug }: { blogSlug: string }) {
  try {
    const { data } = await strapi.blog.getBlogs({
      filters: {
        slug: { $eq: blogSlug },
      },
      paginationLimit: 1,
      populate: 'deep,4',
    })

    return data?.[0]?.attributes ?? null
  } catch (error) {
    return null
  }
}
