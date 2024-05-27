import type { FC } from "react"
import Link from "next/link"

import { listenNowAlbums } from "@/config/data/albums"
import { mapAuthorToCardAuthors } from "@/lib/utils/blog-utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AvatarGroup from "@/components/avatar-goup"
import FormattedTime from "@/components/formatted-time"

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
    <Card className="mt-4 hidden w-full border-none shadow-none md:block">
      <CardContent className="bg-muted/40 flex grow-0 items-center justify-evenly rounded-sm">
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
                        <p className="shrink-0 truncate text-xs font-semibold tracking-tight text-neutral-900 dark:text-white">
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
    </Card>
  )
}

export default RecommededBlogs
