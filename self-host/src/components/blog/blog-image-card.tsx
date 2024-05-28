import type { HTMLAttributes } from "react"
import Image from "next/image"

import type { Album } from "@/config/data/albums"
import { cn } from "@/lib/utils"

type BlogImageProps = {
  album: Album
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
  sizes: string
} & HTMLAttributes<HTMLImageElement>

const BlogImage = ({
  album,
  aspectRatio = "portrait",
  width,
  height,
  sizes,
  className,
  ...props
}: BlogImageProps) => {
  return (
    <Image
      src={album.cover}
      alt={album.name}
      width={width}
      height={height}
      sizes={sizes}
      className={cn(
        "size-auto rounded-sm object-cover transition-all hover:scale-105",
        aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
        className
      )}
      {...props}
    />
  )
}

export default BlogImage
