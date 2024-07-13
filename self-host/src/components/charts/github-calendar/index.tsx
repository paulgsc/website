import { Suspense, type FC } from "react"
import { Skeleton } from "react-activity-calendar"

import type { Props } from "@/types/activity-chart"
import { DEFAULT_THEME } from "@/lib/github-calendar/constants"
import GithubCalendarCard from "@/components/charts/components/github-calendar-card"

const GitHubCalendar: FC<Props> = ({ ...props }) => {
  return (
    <Suspense fallback={<Skeleton theme={DEFAULT_THEME} loading />}>
      <GithubCalendarCard {...props} />
    </Suspense>
  )
}

export default GitHubCalendar
