// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { notFound } from "next/navigation"

import "@/styles/mdx.css"

import { Suspense } from "react"
import type { ContentlayerPagePropsWithoutRootPath } from "@/types"

import { generateStaticParams, getPageFromParams } from "@/lib/content-layer"
import Mdx from "@/components/mdx-components"

// eslint-disable-next-line import/order

generateStaticParams({})

const Page = async ({ params }: ContentlayerPagePropsWithoutRootPath) => {
  const doc = await getPageFromParams({ params })

  if (!doc) {
    notFound()
  }

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <main className="flex flex-1 items-center justify-center md:max-lg:min-h-[940px] lg:max-xl:min-h-[860px] xl:max-2xl:min-h-[520px] 2xl:min-h-[816px]">
        <Mdx code={doc.body.code} />
      </main>
    </Suspense>
  )
}

export default Page
