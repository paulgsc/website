import type { FC } from "react"
import Link from "next/link"

import { listenNowAlbums } from "@/config/data/albums"
import { mapAuthorToCardAuthors } from "@/lib/utils/blog-utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import AvatarGroup from "@/components/avatar-goup"
import FormattedTime from "@/components/formatted-time"
import { Icons } from "@/components/icons"

import BlogImage from "./blog-image-card"

type RecommendedBlotProps = {
  blogAuthor?: string
  blogDate?: string
}

const RecommededBlogs: FC<RecommendedBlotProps> = ({
  blogAuthor,
  blogDate,
}) => {
  const authors = blogAuthor ? mapAuthorToCardAuthors(blogAuthor) : []
  const avatars = authors.map(({ fullName, src }) => ({ alt: fullName, src }))
  return (
    <Card className=" border-none shadow-none">
      <CardHeader className="flex w-fit flex-row items-start">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Recommended Articles
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="bg-muted/40 rounded-sm p-6 text-sm">
        <div className="flex space-x-4 pb-4">
          {listenNowAlbums.map((album) => (
            <article key={album.name} className="block w-full max-w-sm">
              <BlogImage
                album={album}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
              <Link
                href={"/"}
                className="inline-flex shrink-0  items-center space-x-6"
              >
                <div className="mt-2.5 p-2.5 ">
                  <div className="inline-flex items-center space-x-12 ps-2.5">
                    <CardTitle className="text-base uppercase tracking-wide text-cyan-500 saturate-50">
                      some title
                    </CardTitle>
                    <CardDescription className="">15 min read.</CardDescription>
                  </div>
                  <Separator className="my-3 opacity-0" />
                  <h3 className="text-accent-foreground text-ellipsis text-wrap text-lg font-medium">
                    Getting Started with Mitosis: Creating a Cross-Framework
                    Design System
                  </h3>

                  <footer className="flex gap-x-3">
                    <AvatarGroup avatars={avatars} />

                    <div className="">
                      {avatars && (
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                          {avatars.map(({ alt }) => alt).join(", ")}
                        </p>
                      )}

                      {blogDate && <FormattedTime date={blogDate} />}
                    </div>
                  </footer>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mb-16 hidden flex-row items-center  p-1.5 md:flex ">
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent className="space-x-2.5">
            <PaginationItem>
              <Button size="icon" variant="outline" className="size-6">
                <Icons.chevronRight className="size-3.5 rotate-180" />
                <span className="sr-only">Previous</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="size-6">
                <Icons.chevronRight className="size-3.5" />
                <span className="sr-only">Next</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}

export default RecommededBlogs
