import { z } from "zod"

import { arraysEqualIgnoringOrder } from "@/lib/utils/arr-utils"

type APP_USER_ROLES =
  | "subscriber"
  | "github"
  | "unknown"
  | "recruiter"
  | "superuser"
type APP_USER_ACCESS =
  | "portfolio"
  | "blog"
  | "fundme"
  | "trial"
  | "personal"
  | "events"

export const createEnumSchema = <T extends string>(values: Array<T>) =>
  z.enum(values as [T, ...Array<T>])

export const roleSchema = createEnumSchema<APP_USER_ROLES>([
  "github",
  "recruiter",
  "subscriber",
  "superuser",
  "unknown",
])
export const accessSchema = createEnumSchema<APP_USER_ACCESS>([
  "blog",
  "events",
  "fundme",
  "personal",
  "portfolio",
  "trial",
])

export type AppUserRole = z.infer<typeof roleSchema>
export type AppUserAccess = z.infer<typeof accessSchema>

type PossibleRoleAccess<T extends string, P extends string> = {
  // eslint-disable-next-line no-unused-vars
  [K in T]: Array<P>
}

export const allowedRoleAccess = {
  subscriber: ["portfolio", "blog", "events"],
  github: ["portfolio", "blog"],
  unknown: ["trial"],
  recruiter: ["portfolio"],
  superuser: ["blog", "events", "fundme", "personal", "portfolio", "trial"],
} satisfies PossibleRoleAccess<APP_USER_ROLES, APP_USER_ACCESS>

export const roleAccessPairSchema = z
  .object(
    Object.fromEntries(
      Object.entries(allowedRoleAccess).map(([role, accesses]) => [
        role as APP_USER_ROLES,
        z
          .array(accessSchema)
          .refine((arr) => arraysEqualIgnoringOrder(arr, Array.from(accesses))),
      ])
    ) as unknown as Record<APP_USER_ROLES, z.ZodArray<typeof accessSchema>>
  )
  .strict()

export type RoleAccessPairs = typeof allowedRoleAccess
export type RolesWithAccess<R extends APP_USER_ROLES> =
  (typeof allowedRoleAccess)[R][number]

export type RoleWithAllAccess<Access extends Array<APP_USER_ACCESS>> = {
  [Role in keyof RoleAccessPairs]: Access[number] extends RoleAccessPairs[Role][number]
    ? Role
    : never
}[keyof RoleAccessPairs]

export type RequiredAccess<T extends APP_USER_ACCESS> = T

export type AllRequiredAccess<T extends APP_USER_ACCESS> = [T, ...Array<T>]

export type JWTCookeSessionKeys = "jwt_token_for_role"
export type JWTReferrer = "youtube" | "github" | "twitter" | "notion"
export type UTMMedium = "sponsor" | "recruiter" | "member"
export type JWTPayload = {
  referrer: JWTReferrer
  utm_medium: UTMMedium
  scope: Partial<RoleAccessPairs>
}

const referrerSchema = createEnumSchema<JWTReferrer>([
  "github",
  "notion",
  "twitter",
  "youtube",
])
const utmMediumSchema = createEnumSchema<UTMMedium>([
  "member",
  "recruiter",
  "sponsor",
])

export const jwtPayloadSchema = z
  .object({
    referrer: referrerSchema,
    utm_medium: utmMediumSchema,
    scope: roleAccessPairSchema.partial(),
  })
  .strict()

export type UserRoleJWTPayload = z.infer<typeof jwtPayloadSchema>

export type JWTRoleRequiredAction = "reset" | "new" | "keep" | "refresh"
