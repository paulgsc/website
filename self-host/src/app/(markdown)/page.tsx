// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { notFound } from "next/navigation"

import "@/styles/mdx.css"

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
    <article className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <Mdx code={doc.body.code} />
    </article>
  )
}

export default Page
