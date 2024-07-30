import { jwtDecode } from "jwt-decode"

import { jwtPayloadSchema, type UserRoleJWTPayload } from "@/types/auth/roles"

export function decodeJwtPayload(token: string): UserRoleJWTPayload {
  const decoded: unknown = jwtDecode(token)
  return jwtPayloadSchema.parse(decoded)
}
