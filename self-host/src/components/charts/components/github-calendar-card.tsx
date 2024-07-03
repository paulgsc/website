import type { FunctionComponent } from "react"
import { getGitHubContributions } from "@/actions/get-contrib"

import type { Props } from "@/types/activity-chart"
import { apiResponseSchema } from "@/types/activity-chart"
import CalendarCard from "@/components/charts/activity-calendar"

const GithubCalendarCard: FunctionComponent<Props> = async ({
  username,
  year = "last",
  ...props
}) => {
  const data = await getGitHubContributions({
    username,
    year,
  })
  const contribData = apiResponseSchema.parse(data)

  return (
    <CalendarCard activityData={contribData} username={username} {...props} />
  )
}

export default GithubCalendarCard
