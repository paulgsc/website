"use client"

import type { FunctionComponent } from "react"
import { useCallback, useEffect, useState } from "react"
import Calendar, { Skeleton } from "react-activity-calendar"

import type {
  ApiErrorResponse,
  ApiResponse,
  Props,
  Year,
} from "@/types/activity-chart"
import { API_URL, DEFAULT_THEME } from "@/lib/github-calendar/constants"
import { transformData } from "@/lib/github-calendar/utils"

async function fetchCalendarData(
  username: string,
  year: Year
): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}${username}?y=${year}`)
  const data: ApiResponse | ApiErrorResponse = await response.json()

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`
    )
  }

  return data as ApiResponse
}
const GitHubCalendar: FunctionComponent<Props> = ({
  username,
  year = "last",
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
  ...props
}) => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchCalendarData(username, year)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [username, year])

  useEffect(fetchData, [fetchData])

  // React error boundaries can't handle asynchronous code, so rethrow.
  if (error) {
    if (throwOnError) {
      throw error
    } else {
      return <div>{errorMessage}</div>
    }
  }

  if (loading || !data) {
    return <Skeleton {...props} loading />
  }

  const theme = props.theme ?? DEFAULT_THEME

  const defaultLabels = {
    totalCount: `{{count}} contributions in ${
      year === "last" ? "the last year" : "{{year}}"
    }`,
  }

  const totalCount = year === "last" ? data.total["lastYear"] : data.total[year]

  return (
    <Calendar
      data={transformData(data.contributions, transformFn)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      {...props}
      maxLevel={4}
    />
  )
}

export default GitHubCalendar
