import { z } from "zod"

// Define the roles and access levels
const APP_USER_ROLES = [
  "subscriber",
  "github",
  "unknown",
  "recruiter",
  "superuser",
] as const

const APP_USER_ACCESS = [
  "portfolio",
  "blog",
  "events",
  "fundme",
  "trial",
  "personal",
] as const

export const roleSchema = z.enum(APP_USER_ROLES)
export const accessSchema = z.enum(APP_USER_ACCESS)

export type AppUserRole = z.infer<typeof roleSchema>
export type AppUserAccess = z.infer<typeof accessSchema>

export const allowedRoleAccess: Record<
  typeof roleSchema._type,
  ReadonlyArray<typeof accessSchema._type>
> = {
  subscriber: ["portfolio", "blog", "events"],
  github: ["portfolio", "blog"],
  unknown: ["trial"],
  recruiter: ["portfolio"],
  superuser: ["blog", "events", "fundme", "personal", "portfolio", "trial"],
} as const satisfies Record<AppUserRole, ReadonlyArray<AppUserAccess>>

export type RoleAccessPairs = typeof allowedRoleAccess

export type JWTCookeSessionKeys = "jwt_token_for_role"
export type JWTReferrer = "youtube" | "github" | "twitter" | "notion"
export type UTMMedium = "sponsor" | "recruiter" | "member"
export type JWTPayload = {
  referrer: JWTReferrer
  utm_medium: UTMMedium
  scope: Partial<RoleAccessPairs>
}

export type JWTRoleRequiredAction = "reset" | "new" | "keep"
