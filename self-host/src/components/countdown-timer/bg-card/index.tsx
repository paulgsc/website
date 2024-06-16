import type { FC, HTMLAttributes } from "react"
import { cn } from "@/lib"

const CountDownCard: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
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
  )
}

export default CountDownCard
