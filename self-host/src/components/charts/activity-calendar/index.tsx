/**
 * This file contains code adapted from work originally created by Jonathan Gruber.
 * Original work Copyright (c) 2019 Jonathan Gruber
 * Adapted under the terms of the MIT License.
 *
 * For the full license text:
 * @see https://github.com/grubersjoe/react-github-calendar/blob/main/LICENSE
 */
import type { FunctionComponent } from "react"
import Calendar from "react-activity-calendar"

import type { ApiResponseActivitySchema, Props } from "@/types/activity-chart"
import { DEFAULT_THEME } from "@/lib/github-calendar/constants"
import { transformData } from "@/lib/github-calendar/utils"

type CalendarCardProps = {
  activityData: ApiResponseActivitySchema
} & Props

const CalendarCard: FunctionComponent<CalendarCardProps> = async ({
  activityData,
  year = "last",
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  ...props
}) => {
  const theme = props.theme ?? DEFAULT_THEME

  const defaultLabels = {
    totalCount: `{{count}} contributions in ${
      year === "last" ? "the last year" : "{{year}}"
    }`,
  }

  const totalCount =
    year === "last" ? activityData.total["lastYear"] : activityData.total[year]

  return (
    <Calendar
      data={transformData(activityData.contributions, transformFn)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      {...props}
      maxLevel={4}
    />
  )
}

export default CalendarCard
