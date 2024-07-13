import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type DocsPageHeaderProps = {
  heading: string
  text?: string
} & HTMLAttributes<HTMLDivElement>

export const DocsPageHeader = ({
  heading,
  text,
  className,
  ...props
}: DocsPageHeaderProps) => {
  return (
    <span className="xl:max-2xl:fixed xl:max-2xl:bottom-40 xl:max-2xl:right-10 2xl:block">
      <div className={cn("space-y-4", className)} {...props}>
        <h1 className="font-heading inline-block text-4xl lg:text-5xl xl:max-2xl:text-3xl">
          {heading}
        </h1>
        {text && (
          <p className="text-muted-foreground text-xl xl:max-2xl:text-base">
            {text}
          </p>
        )}
      </div>
      <hr className="my-4" />
    </span>
  )
}
