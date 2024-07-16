// @todo fix the classnames collision remove eslint ignore

import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type BannerMarqueeProps = {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
  itemsCount?: number
  msg?: string
}

export const BannerMarquee = ({
  className,
  msg = "foo foo!",
  itemsCount = 3,
  duration = 15,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BannerMarqueeProps) => {
  return (
    <div
      style={
        {
          "--duration": duration,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      role="banner"
      className={cn(
        "flex items-start justify-start space-x-16 overflow-hidden",
        className
      )}
    >
      {Array.from({ length: itemsCount }, (_, index) => (
        <span
          key={index}
          className="animate-marquee whitespace-nowrap text-[6rem] font-extrabold uppercase text-teal-200 text-opacity-20 transition-transform"
        >
          {msg}
        </span>
      ))}
    </div>
  )
}
