import type { HTMLAttributes } from "react"
import { forwardRef } from "react"
import { cn } from "@/lib"

const CountDownCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      backgroundRepeat: "no-repeat, repeat",
    }}
    className={cn(
      "bg-countdown-timer absolute inset-0",
      "bg-[url('./assets/challenges/countdown-timer/hills.svg'),_url('./assets/challenges/countdown-timer/stars.svg')]",
      "bg-contain bg-[position:bottom,_top]",
      className
    )}
    {...props}
  />
))

CountDownCard.displayName = "CountDownCard"

const CountDowndTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    {...props}
    className={cn(
      "text-center text-xl uppercase leading-10 tracking-[0.5rem] text-white",
      className
    )}
  />
))

CountDowndTitle.displayName = "Title"

export { CountDownCard, CountDowndTitle }
