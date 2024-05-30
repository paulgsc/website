import type { HTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { Check, Circle, X } from "lucide-react"

import { cn } from "@/lib/utils"

const timelineVariants = cva("grid", {
  variants: {
    positions: {
      left: "[&>li]:grid-cols-[0_min-content_1fr]",
      right: "[&>li]:grid-cols-[1fr_min-content]",
      center: "[&>li]:grid-cols-[1fr_min-content_1fr]",
    },
  },
  defaultVariants: {
    positions: "left",
  },
})

type TimelineProps = object &
  HTMLAttributes<HTMLUListElement> &
  VariantProps<typeof timelineVariants>

const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  ({ children, className, positions, ...props }, ref) => {
    return (
      <ul
        className={cn(timelineVariants({ positions }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    )
  }
)
Timeline.displayName = "Timeline"

const timelineItemVariants = cva("grid items-center gap-x-2", {
  variants: {
    status: {
      done: "text-primary",
      default: "text-muted-foreground",
    },
  },
  defaultVariants: {
    status: "default",
  },
})

type TimelineItemProps = object &
  HTMLAttributes<HTMLLIElement> &
  VariantProps<typeof timelineItemVariants>

const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, status, ...props }, ref) => (
    <li
      className={cn(timelineItemVariants({ status }), className)}
      ref={ref}
      {...props}
    />
  )
)
TimelineItem.displayName = "TimelineItem"

const timelineDotVariants = cva(
  "col-start-2 col-end-3 row-start-1 row-end-1 flex size-4 items-center justify-center rounded-full border border-current",
  {
    variants: {
      status: {
        default: "[&>*]:hidden",
        current:
          "[&>*:not(.lucide-circle)]:hidden [&>.lucide-circle]:fill-current [&>.lucide-circle]:text-current",
        done: "bg-primary [&>.lucide-check]:text-background [&>*:not(.lucide-check)]:hidden",
        error:
          "border-destructive bg-destructive [&>.lucide-x]:text-background [&>*:not(.lucide-x)]:hidden",
        custom: "[&>*:not(:nth-child(4))]:hidden [&>*:nth-child(4)]:block",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
)

type TimelineDotProps = {
  customIcon?: ReactNode
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof timelineDotVariants>

const TimelineDot = forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, status, customIcon, ...props }, ref) => (
    <div
      role="status"
      className={cn("timeline-dot", timelineDotVariants({ status }), className)}
      ref={ref}
      {...props}
    >
      <Circle className="size-2.5" />
      <Check className="size-3" />
      <X className="size-3" />
      {customIcon}
    </div>
  )
)
TimelineDot.displayName = "TimelineDot"

const timelineContentVariants = cva(
  "text-muted-foreground row-start-2 row-end-2 pb-8",
  {
    variants: {
      side: {
        right: "col-start-3 col-end-4 mr-auto text-left",
        left: "col-start-1 col-end-2 ml-auto text-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

type TimelineContentProps = object &
  HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof timelineContentVariants>

const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, side, ...props }, ref) => (
    <div
      className={cn(timelineContentVariants({ side }), className)}
      ref={ref}
      {...props}
    />
  )
)
TimelineContent.displayName = "TimelineContent"

const timelineHeadingVariants = cva(
  "row-start-1 row-end-1 line-clamp-1 max-w-full truncate",
  {
    variants: {
      side: {
        right: "col-start-3 col-end-4 mr-auto text-left",
        left: "col-start-1 col-end-2 ml-auto text-right",
      },
      variant: {
        primary: "text-primary text-base font-medium",
        secondary: "text-muted-foreground text-sm font-light",
      },
    },
    defaultVariants: {
      side: "right",
      variant: "primary",
    },
  }
)

type TimelineHeadingProps = object &
  HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof timelineHeadingVariants>

const TimelineHeading = forwardRef<HTMLParagraphElement, TimelineHeadingProps>(
  ({ className, side, variant, ...props }, ref) => (
    <p
      role="heading"
      aria-level={variant === "primary" ? 2 : 3}
      className={cn(timelineHeadingVariants({ side, variant }), className)}
      ref={ref}
      {...props}
    />
  )
)
TimelineHeading.displayName = "TimelineHeading"

type TimelineLineProps = {
  done?: boolean
} & HTMLAttributes<HTMLHRElement>

const TimelineLine = forwardRef<HTMLHRElement, TimelineLineProps>(
  ({ className, done = false, ...props }, ref) => {
    return (
      <hr
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-16 w-0.5 justify-center rounded-full",
          done ? "bg-primary" : "bg-muted",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TimelineLine.displayName = "TimelineLine"

export {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineHeading,
  TimelineLine,
}
