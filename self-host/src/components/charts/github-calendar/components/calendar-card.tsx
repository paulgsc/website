import type { FunctionComponent } from "react"
import { getGitHubContributions } from "@/actions/get-contrib"
import Calendar from "react-activity-calendar"

import { apiResponseSchema, type Props } from "@/types/activity-chart"
import { DEFAULT_THEME } from "@/lib/github-calendar/constants"
import { transformData } from "@/lib/github-calendar/utils"

const CalendarCard: FunctionComponent<Props> = async ({
  username,
  year = "last",
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  ...props
}) => {
  const data = await getGitHubContributions({ username, year })
  const contribData = apiResponseSchema.parse(data)

  const theme = props.theme ?? DEFAULT_THEME

  const defaultLabels = {
    totalCount: `{{count}} contributions in ${
      year === "last" ? "the last year" : "{{year}}"
    }`,
  }

  const totalCount =
    year === "last" ? contribData.total["lastYear"] : contribData.total[year]

  return (
    <Calendar
      data={transformData(contribData.contributions, transformFn)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      {...props}
      maxLevel={4}
    />
  )
}

export default CalendarCard
