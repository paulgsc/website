import { Suspense, type FC } from "react"
import { Skeleton } from "react-activity-calendar"

import type { Props } from "@/types/activity-chart"
import { DEFAULT_THEME } from "@/lib/github-calendar/constants"

import GitHubCalendar from "./github-calendar"

const GitHubCalendarWrapper: FC<Props> = ({ ...props }) => {
  return (
    <Suspense fallback={<Skeleton theme={DEFAULT_THEME} loading />}>
      <GitHubCalendar {...props} />
    </Suspense>
  )
}

export default GitHubCalendarWrapper
