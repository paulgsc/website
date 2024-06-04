import type { FetchGithubContributionsProps } from "@/types/activity-chart"
import type {
  ApiErrorResponseSchema,
  ApiResponseSchema,
} from "@/types/activity-chart/schema"
import { apiResponseSchema } from "@/types/activity-chart/schema"
import { getCacheKey, getFromCache, setInCache } from "@/lib/cache"

import { fetchGithubContributions } from "./fetch-github-contrib"

// Main action function
export async function getGitHubContributions({
  username,
  year,
}: FetchGithubContributionsProps): Promise<
  ApiResponseSchema | ApiErrorResponseSchema
> {
  const cacheKey = getCacheKey({ username, year })

  try {
    // Try to get from cache
    const cachedData = await getFromCache(cacheKey)
    if (cachedData) {
      return cachedData
    }

    // If not in cache or expired, fetch from API
    console.log(`Fetching from API: ${username}, year: ${year}`)
    const apiData = await fetchGithubContributions({ username, year })
    const data = apiResponseSchema.parse(apiData)
    // Cache the result with a TTL of one day (86400000 ms)
    await setInCache(cacheKey, data, 86400000)

    return data
  } catch (error) {
    return { error: JSON.stringify(error) }
  }
}
