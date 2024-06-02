import type { Metadata } from "next"
import { siteConfig } from "@/config"

import { absoluteUrl } from "./utils/url-utils"

export type OpenGraphType =
  | "article"
  | "book"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "profile"
  | "website"
  | "video.tv_show"
  | "video.other"
  | "video.movie"
  | "video.episode"

export default async function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  url,
  type = "website",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  url?: string | URL
  type?: OpenGraphType
} = {}): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: {
      type: type,
      locale: "en_US",
      url: url
        ? typeof url === "string"
          ? absoluteUrl(url)
          : url
        : siteConfig.name,
      title,
      description,
      siteName: "karibu.maishatu.com",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
      creator: "@pgdev",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
