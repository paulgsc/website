// eslint-disable-next-line import/order
import Link from "next/link"
// eslint-disable-next-line import/order
import { notFound } from "next/navigation"

import "@/styles/mdx.css"

import { generateStaticParams, getPageFromParams } from "@/lib"
import type { ContentlayerPagePropsWithoutRootPath } from "@/types"
// eslint-disable-next-line import/order
import Balancer from "react-wrap-balancer"

import { getTableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons"
import Mdx from "@/components/mdx-components"
import { DashboardTableOfContents } from "@/components/toc"

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
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
          <div className="truncate">Docs</div>
          <Icons.chevronRight className="size-4" />
          <div className="text-foreground font-medium">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-muted-foreground text-lg">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <Icons.externalLink className="size-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <Icons.externalLink className="size-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
      </div>
      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  )
}

export default Page
