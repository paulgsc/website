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
    <article className="flex w-full flex-col items-center justify-center max-md:mt-10 md:absolute md:inset-0 xl:grid xl:grid-cols-8">
      <div className="w-full max-xl:flex max-xl:justify-center xl:col-span-6 xl:col-start-2">
        <Mdx code={doc.body.code} />
      </div>
    </article>
  )
}

export default Page
