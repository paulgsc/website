import type { ApiResponseActivitySchema } from "@/types/activity-chart"
import type { FetchGithubContributionsProps } from "@/types/activity-chart/github-chart"

// Mock cache functions
const mockCache = new Map<
  string,
  { data: ApiResponseActivitySchema; expiresAt: number }
>()

export function getCacheKey({
  username,
  year,
}: FetchGithubContributionsProps): string {
  return `github-contributions:${username}:${year}`
}

export async function getFromCache(
  key: string
): Promise<ApiResponseActivitySchema | null> {
  console.log(`Attempting to fetch from cache: ${key}`)
  const cached = mockCache.get(key)
  if (cached && cached.expiresAt > Date.now()) {
    console.log(`Cache hit: ${key}`)
    return cached.data
  }
  console.log(`Cache miss or expired: ${key}`)
  return null
}

export async function setInCache(
  key: string,
  data: ApiResponseActivitySchema,
  ttlMs: number
): Promise<void> {
  console.log(`Setting in cache: ${key}, TTL: ${ttlMs}ms`)
  mockCache.set(key, { data, expiresAt: Date.now() + ttlMs })
}
