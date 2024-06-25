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
    <main className="flex w-full flex-col items-center justify-center md:absolute md:inset-0 md:max-lg:min-h-[940px] lg:max-xl:min-h-[860px] xl:grid xl:grid-cols-8 xl:max-2xl:mt-16 2xl:min-h-[560px]">
      <div className="w-full max-xl:flex max-xl:justify-center xl:col-span-6 xl:col-start-2">
        <Mdx code={doc.body.code} />
      </div>
    </main>
  )
}

export default Page
