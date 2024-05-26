// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { notFound } from "next/navigation"

import "@/styles/mdx.css"

import Image from "next/image"
import { generateStaticParams, getPageFromParams } from "@/lib"
import type { ContentlayerPagePropsWithoutRootPath } from "@/types"

import { getTableOfContents } from "@/lib/toc"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// eslint-disable-next-line import/order

import BlogCategories from "@/components/blog/blog-categories"

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
    <div className="flex flex-1 flex-col">
      <section className="max-w-md:flex max-w-md:shrink max-w-md:flex-col w-full  md:grid md:grid-cols-[.1fr_.35fr_.45fr_.1fr] 2xl:grid-cols-[.1fr_.35fr_.45fr_.1fr]">
        <Card className=" col-start-2 border-none shadow-none">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">some text</CardContent>
        </Card>
        <Card className="max-h-96 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80"
            alt="Async Awakenings"
            width={600}
            height={811}
            sizes="(min-width: 1540px) 569px, (min-width: 780px) 732px, 1630px"
            className="aspect-[4/3] h-auto w-full object-cover transition-all hover:scale-105"
          />
        </Card>
      </section>
      <BlogCategories />
      {/* <RecommededBlogs blogAuthor="Paul M Gathondu" /> */}
    </div>
  )
}

export default Page
