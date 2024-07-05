import { notFound } from "next/navigation"

import "@/styles/mdx.css"

import type { ContentlayerPagePropsWithoutRootPath } from "@/types/content-layer"
import type { Layouts } from "@/types/layout"
import { SafeValidLayoutSchema, ValidatedLayoutSchema } from "@/types/layout"
import { generateStaticParams, getPageFromParams } from "@/lib/content-layer"
import { getTableOfContents } from "@/lib/toc"
import { ScrollArea } from "@/components/ui/scroll-area"
import BlogLayout from "@/components/layout-components/BlogLayout"
// eslint-disable-next-line import/order

import Mdx from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
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
  const parsedLayout: Layouts = SafeValidLayoutSchema.safeParse(doc.layout)
    .success
    ? ValidatedLayoutSchema.parse(doc.layout?.trim())
    : "default"

  return (
    <BlogLayout layout={parsedLayout}>
      <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px] xl:max-2xl:max-h-[calc(var(--vh)-5.8rem)] 2xl:max-h-[calc(var(--vh)-5rem)]">
        <div className="mx-auto w-full min-w-0">
          <DocsPageHeader heading={doc.title} text={doc.description} />
          <Mdx code={doc.body.code} />
        </div>
        {doc.toc && (
          <aside className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
              <ScrollArea className="pb-10">
                <div className="sticky top-16 -mt-10 h-[calc(100vh-12rem)] py-12">
                  <DashboardTableOfContents toc={toc} />
                </div>
              </ScrollArea>
            </div>
          </aside>
        )}
      </main>
    </BlogLayout>
  )
}

export default Page
