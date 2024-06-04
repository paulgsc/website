import type { FetchGithubContributionsProps } from "@/types/activity-chart/github-chart"
import type { ApiResponseSchema } from "@/types/activity-chart/schema"

// Mock cache functions
const mockCache = new Map<
  string,
  { data: ApiResponseSchema; expiresAt: number }
>()

export function getCacheKey({
  username,
  year,
}: FetchGithubContributionsProps): string {
  return `github-contributions:${username}:${year}`
}

export async function getFromCache(
  key: string
): Promise<ApiResponseSchema | null> {
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
  data: ApiResponseSchema,
  ttlMs: number
): Promise<void> {
  console.log(`Setting in cache: ${key}, TTL: ${ttlMs}ms`)
  mockCache.set(key, { data, expiresAt: Date.now() + ttlMs })
}
