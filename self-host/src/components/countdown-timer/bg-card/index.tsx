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

const CountDownCardItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
))

CountDownCardItem.displayName = "CountdownCardItem"

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

const TimerCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-countdown-timer-foreground relative size-32 overflow-hidden rounded-lg",
        " before:transition-transform before:duration-300 before:ease-linear",
        " after:transition-transform after:duration-300 after:ease-linear",
        "before:absolute before:inset-0 before:h-1/2 before:rounded-lg before:bg-[hsl(236,21%,26%)]",
        "after:absolute after:inset-0 after:top-1/2 after:h-1/2 after:rounded-lg after:bg-[hsl(236,21%,26%)]",
        "before:z-0 after:z-0",
        className
      )}
      {...props}
    />
  )
)

TimerCard.displayName = "TimerCard"

const TimerCardContent = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    role="timer"
    className={cn(
      "absolute inset-0 z-10 flex items-center justify-center bg-transparent text-center text-6xl text-[hsl(345,95%,68%)]",
      className
    )}
    {...props}
  />
))

TimerCardContent.displayName = "TimerCardContent"
export {
  CountDownCard,
  CountDownCardItem,
  CountDowndTitle,
  TimerCard,
  TimerCardContent,
}
