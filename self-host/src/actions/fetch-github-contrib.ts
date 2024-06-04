import type { FetchGithubContributionsProps } from "@/types/activity-chart/github-chart"
import type {
  ApiErrorResponseSchema,
  ApiResponseSchema,
} from "@/types/activity-chart/schema"
import {
  apiErrorResponseSchema,
  apiResponseSchema,
} from "@/types/activity-chart/schema"
import { API_URL } from "@/lib/github-calendar/constants"

export async function fetchGithubContributions({
  username,
  year,
}: FetchGithubContributionsProps): Promise<
  ApiResponseSchema | ApiErrorResponseSchema
> {
  try {
    const response = await fetch(`${API_URL}${username}?y=${year}`)
    const data: ApiResponseSchema | ApiErrorResponseSchema =
      await response.json()

    if (!response.ok) {
      // Validate error response
      const errorResult = apiErrorResponseSchema.safeParse(data)
      if (errorResult.success) {
        return {
          error: `Fetching GitHub contribution data for "${username}" failed: ${errorResult.data.error}`,
        }
      } else {
        // If error response doesn't match the schema
        return { error: "Unknown error from the server" }
      }
    }

    // Validate successful response
    const result = apiResponseSchema.safeParse(data)
    if (result.success) {
      return result.data
    } else {
      // If response doesn't match the schema
      const errorDetails = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ")
      return { error: `Invalid response format: ${errorDetails}` }
    }
  } catch (error) {
    return { error: "Internal Server Error" }
  }
}
