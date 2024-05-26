// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { notFound } from "next/navigation"

import "@/styles/mdx.css"

import Image from "next/image"
import { generateStaticParams, getPageFromParams } from "@/lib"
import type { ContentlayerPagePropsWithoutRootPath } from "@/types"

// eslint-disable-next-line import/order

import { getTableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RecommededBlogs from "@/components/blog/recomended-blogs"

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
  console.log(toc)

  return (
    <main className="flex shrink-0 flex-col">
      <section className="max-w-md:flex max-w-md:shrink max-w-md:flex-col  w-full md:grid md:grid-cols-[.1fr_.35fr_.45fr_.1fr] 2xl:grid-cols-[.1fr_.35fr_.35fr_.1fr]">
        <Card className=" col-start-2 border-none shadow-none">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">some text</CardContent>
        </Card>
        <Card className="h-96 w-full overflow-hidden border-none">
          <CardContent
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80"
              alt="Async Awakenings"
              layout="fill"
              objectFit="cover"
              className={cn(
                "absolute aspect-square size-auto object-cover transition-all hover:scale-105"
              )}
            />
          </CardContent>
        </Card>
      </section>

      <RecommededBlogs blogAuthor="Paul M Gathondu" />
    </main>
  )
}

export default Page
