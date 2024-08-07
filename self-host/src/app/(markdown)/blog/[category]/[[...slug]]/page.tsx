// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { notFound } from "next/navigation"

import "@/styles/mdx.css"

import { generateStaticParams, getPageFromParams } from "@/lib"
import type { ContentlayerPagePropsWithoutRootPath } from "@/types"

import { getTableOfContents } from "@/lib/toc"
import { ScrollArea } from "@/components/ui/scroll-area"
// eslint-disable-next-line import/order

import Mdx from "@/components/mdx-components"
import DashboardTableOfContents from "@/components/toc"

// We add the rootPath to the params since the [[...slug]] pattern in Next.js
// is exclusive of the path and only generates the params for the slug part.
const rootPath = ["blog"]

generateStaticParams({ rootPath: rootPath })

const Page = async ({ params }: ContentlayerPagePropsWithoutRootPath) => {
  const doc = await getPageFromParams({ params, rootPath })

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <div className="relative mb-2.5 mt-12 grid-cols-[.20fr_.60fr_.20fr] md:grid">
      <aside />
      <section className="mx-auto w-full min-w-0">
        <header className="whitespace-nowrap text-balance tracking-tight sm:mb-6 lg:mb-8">
          <h1 className="font-extrabold capitalize leading-10 sm:text-xl md:text-2xl xl:text-3xl">
            {doc.title}
          </h1>
          <h3 className="ps-2.5 sm:text-base md:text-lg lg:text-xl">
            {doc.description}
          </h3>
        </header>
        <Mdx code={doc.body.code} />
      </section>
      {doc.toc && (
        <aside className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </aside>
      )}
    </div>
  )
}

export default Page
