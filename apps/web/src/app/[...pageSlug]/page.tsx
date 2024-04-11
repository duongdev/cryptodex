/* eslint-disable react/no-danger */
import { getPage } from '@/lib/api/page'

import './page.css'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { pageSlug: string }
}) {
  const { pageSlug } = params
  const page = await getPage(pageSlug)

  if (!page) {
    notFound()
  }

  return (
    <div className="relative min-h-dvh">
      <div className="absolute top-0 -z-10 h-full w-full bg-white dark:hidden">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 hidden dark:block">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
        </div>
      </div>

      <div className="container mx-auto max-w-screen-md p-4 pb-8 md:mb-16 md:px-0">
        <div className="flex flex-col items-start justify-center py-8 md:py-16">
          <h1 className="text-5xl">{page?.title_en}</h1>
        </div>
        <div
          className="[& h1]:text-lg page-content space-y-4"
          dangerouslySetInnerHTML={{ __html: page?.content_en || '' }}
        />
      </div>
    </div>
  )
}
