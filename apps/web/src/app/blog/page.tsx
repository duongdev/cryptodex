import type { Metadata } from 'next'
import Link from 'next/link'

import { SearchInput } from '@/components/ui/search-input'
import { getBlogPosts } from '@/lib/api/blog'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Blogs | HargaCrypto',
  description: 'Blogs from HargaCrypto',
  openGraph: {
    title: 'Blogs | HargaCrypto',
    description: 'Blogs from HargaCrypto',
    type: 'website',
    siteName: 'HargaCrypto',
  },
}

export default async function Blog() {
  const { blogs } = await getBlogPosts({ perPage: 100 })

  return (
    <div className="container mx-auto max-w-screen-lg p-4 pb-8 pt-4 md:mb-16 md:p-0 md:px-8 md:pt-8">
      <div className="flex flex-col items-start justify-center py-8 md:py-12">
        <h1 className="text-5xl">Blogs</h1>
      </div>
      <div className="mb-8 hidden">
        <SearchInput placeholder="Search blog" />
      </div>
      {blogs.length === 0 && <div>There are no blog posts yet.</div>}
      <div>
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            className="group flex flex-col gap-2 border-b py-2 last:border-b-0 md:flex-row"
            href={`/blog/${blog.attributes?.slug}`}
          >
            <h2 className="flex-1 group-hover:underline">
              {blog.attributes?.title_en}
            </h2>
            <div className="text-muted-foreground ml-auto text-sm">
              {blog.attributes?.createdAt
                ? new Date(blog.attributes?.createdAt).toLocaleDateString()
                : ''}
            </div>
            {/* <div
              className="[& h2]:text-lg page-content"
              dangerouslySetInnerHTML={{ __html: blog.content_en || '' }}
            /> */}
          </Link>
        ))}
      </div>
    </div>
  )
}
