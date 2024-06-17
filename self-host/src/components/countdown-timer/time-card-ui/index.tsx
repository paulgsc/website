import { cn } from "@/lib"

import {
  CountDownCardItem,
  TimerCard,
  TimerCardContent,
} from "@/components/countdown-timer/bg-card"

//@todo remove me.
const getDuration = () => 0
const timeFormats = ["days", "hours", "minutes", "seconds"] as const

const TimeCardUi = () => {
  return (
    <>
      {timeFormats.map((time) => (
        <CountDownCardItem
          key={time}
          className="flex shrink-0 flex-col items-center gap-y-4"
        >
          <TimerCard>
            <div className="absolute inset-y-1/2 end-0 z-30 size-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[hsl(234,17%,12%)]" />
            <div className="absolute inset-y-1/2 start-0 z-30 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(234,17%,12%)]" />
            <div
              className={cn(
                "absolute inset-0 inset-y-1/2 z-20 h-0.5 -translate-y-1/2 bg-[hsl(234,23%,23%)]/40",
                ""
              )}
            />
            <TimerCardContent>
              <time>{getDuration()}</time>
            </TimerCardContent>
          </TimerCard>
          <p role="note" className="text-countdown-timer-foreground uppercase">
            {time}
          </p>
        </CountDownCardItem>
      ))}
    </>
  )
}

export default TimeCardUi
