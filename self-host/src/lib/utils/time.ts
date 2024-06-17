const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000
const MILLISECONDS_PER_MINUTE = 60 * 1000

export function getTimeNumber(duration: number) {
  const days = Math.floor(duration / MILLISECONDS_PER_DAY)
  const remainingSeconds = duration % MILLISECONDS_PER_DAY
  const hours = Math.floor(remainingSeconds / MILLISECONDS_PER_HOUR)
  const remainingMinutes = remainingSeconds % MILLISECONDS_PER_HOUR
  const minutes = Math.floor(remainingMinutes / MILLISECONDS_PER_MINUTE)
  const seconds = Math.floor(
    (remainingMinutes % MILLISECONDS_PER_MINUTE) / 1000
  )

  return { days, hours, minutes, seconds }
}
