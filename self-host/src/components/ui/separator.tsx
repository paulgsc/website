"use client"

import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"
import { Root } from "@radix-ui/react-separator"

import cn from "@/lib/utils/cn"

const Separator = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = Root.displayName

export { Separator }
