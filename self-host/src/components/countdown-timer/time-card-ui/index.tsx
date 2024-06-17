"use client"

import { useEffect, useState } from "react"

import cn from "@/lib/utils/cn"
import { getTimeNumber } from "@/lib/utils/time"
import {
  CountDownCardItem,
  TimerCard,
  TimerCardContent,
} from "@/components/countdown-timer/bg-card"

const timeFormats = ["days", "hours", "minutes", "seconds"] as const
const endTimeStamp = Date.now() + 60 * 1000

const TimeCardUi = () => {
  const [timeUnits, setTimeUnits] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateRemainingTime = () => {
      const remainingDuration = endTimeStamp - Date.now()

      if (remainingDuration < 0) {
        clearInterval(interval)
        return
      }

      setTimeUnits(getTimeNumber(remainingDuration))
    }

    const interval = setInterval(updateRemainingTime, 1000)
    updateRemainingTime() // Initial call to set the state immediately

    return () => clearInterval(interval)
  }, [])

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
              <time>{timeUnits[time]}</time>
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
