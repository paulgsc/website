// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { notFound } from "next/navigation"

import "@/styles/mdx.css"

import { generateStaticParams, getPageFromParams } from "@/lib"
import { type ContentlayerPagePropsWithoutRootPath } from "@/types"

import { getTableOfContents } from "@/lib/toc"
import { ScrollArea } from "@/components/ui/scroll-area"
import BlogLayout from "@/components/layout-components/BlogLayout"
// eslint-disable-next-line import/order

import Mdx from "@/components/mdx-components"
import DashboardTableOfContents from "@/components/toc"

// We add the rootPath to the params since the [[...slug]] pattern in Next.js
// is exclusive of the path and only generates the params for the slug part.
const rootPath = ["about"]

generateStaticParams({ rootPath: rootPath })

const Page = async ({ params }: ContentlayerPagePropsWithoutRootPath) => {
  const doc = await getPageFromParams({ params, rootPath })

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)
  // const layout: Layouts = SafeValidLayoutSchema.safeParse(doc.layout).success
  //   ? ValidatedLayoutSchema.parse(doc.layout?.trim())
  //   : "default"
  return (
    <BlogLayout layout={"channel"}>
      <section className="mx-auto w-full min-w-0">
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
    </BlogLayout>
  )
}

export default Page
