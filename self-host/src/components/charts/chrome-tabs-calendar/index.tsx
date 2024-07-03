import { Suspense, type FC } from "react"
import { Skeleton } from "react-activity-calendar"

import type { Props } from "@/types/activity-chart"
import { DEFAULT_THEME } from "@/lib/github-calendar/constants"
import ChromeTabsCalendarCard from "@/components/charts/components/chrome-tabs-calendar-card"

const ChromeTabsCalendar: FC<Props> = ({ ...props }) => {
  return (
    <Suspense fallback={<Skeleton theme={DEFAULT_THEME} loading />}>
      <ChromeTabsCalendarCard {...props} />
    </Suspense>
  )
}

export default ChromeTabsCalendar
