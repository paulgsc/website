"use client"

import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"
import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport,
} from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, children, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <Viewport className="size-full rounded-[inherit]">{children}</Viewport>
    <ScrollBar />
    <Corner />
  </Root>
))
ScrollArea.displayName = Root.displayName

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-px",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-px",
      className
    )}
    {...props}
  >
    <ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
  </ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
