import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getJwtCookie, getJwtCookieAction } from "@/lib/auth/jwt"

import { applyJwtCookieAction, pipe } from "./lib/auth/role"

export async function middleware(request: NextRequest) {
  const getJwtRequiredAction = pipe(getJwtCookie).pipe(
    async (token) => await getJwtCookieAction(token)
  )

  const response = NextResponse.next()
  const action = await getJwtRequiredAction(request, "jwt_token_for_role")

  await applyJwtCookieAction(request, response, action)
  return response
}

export const config = {
  matcher: ["/:path*"],
}
