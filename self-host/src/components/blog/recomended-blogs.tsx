import type { FC } from "react"
import Link from "next/link"

import { listenNowAlbums } from "@/config/data/albums"
import { mapAuthorToCardAuthors } from "@/lib/utils/blog-utils"
import { CardDescription, CardTitle } from "@/components/ui/card"
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
    <div className="bg-muted/25 mx-auto  hidden h-[520px] w-full grow-0 justify-evenly gap-4 py-6 shadow-none md:flex">
      {listenNowAlbums.slice(0, 3).map((album) => (
        <article
          key={album.name}
          className="border-accent outline-muted block w-full max-w-sm space-y-1.5 overflow-hidden rounded-md border shadow-inner xl:max-w-md"
        >
          <BlogImage
            album={album}
            className="h-[250px] w-full"
            aspectRatio="portrait"
            width={250}
            height={250}
            sizes="242px"
          />
          <Link
            href={"/"}
            className="inline-flex shrink-0  items-center space-x-6"
          >
            <div className="mt-2.5 p-2.5 ">
              <div className="inline-flex items-center space-x-4 ps-2.5">
                <CardTitle className="border-muted-foreground border p-0.5 text-xs font-light uppercase tracking-wide text-cyan-500 saturate-50">
                  some title
                </CardTitle>
                <CardDescription className="">15 min read.</CardDescription>
              </div>
              <Separator className="my-3 opacity-0" />
              <h3 className="text-accent-foreground text-ellipsis text-wrap text-lg font-medium">
                Getting Started with Mitosis: Creating a Cross-Framework Design
                System
              </h3>

              <footer className="mt-2.5 flex items-center justify-start gap-x-2.5 ps-2.5 pt-0.5">
                <AvatarGroup avatars={avatars} />

                <div className="">
                  {avatars && (
                    <p className="text-xs font-semibold tracking-tight text-neutral-900 dark:text-white">
                      {avatars.map(({ alt }) => alt).join(", ")}
                    </p>
                  )}

                  <time className="text-muted-foreground truncate text-wrap text-xs tracking-tight ">
                    {" "}
                    {blogDate && <FormattedTime date={blogDate} />}
                  </time>
                </div>
              </footer>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

export default RecommededBlogs
