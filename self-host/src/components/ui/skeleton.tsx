import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
