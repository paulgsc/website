import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { generateJWT, verifyJWT } from "@/lib/auth/jwt"

import type { JWTReferrer, UTMMedium } from "./types/auth/jwt"
import { validateReferrer, validateUtmMedium } from "./types/auth/jwt"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value
  if (request.nextUrl.pathname === "/") {
    if (token) {
      try {
        await verifyJWT(token)
        // If we get here, the token is valid, so we can just proceed
        return NextResponse.next()
      } catch (error) {
        // Token is invalid, we'll remove it and continue to create a new one if needed
        const response = NextResponse.next()
        response.cookies.delete("access_token")
      }
    }

    const { searchParams } = new URL(request.url)
    const referralParam = searchParams.get("referrer")
    const utmParam = searchParams.get("utm_medium")
    const referral: JWTReferrer | null = validateReferrer(referralParam)
    const utmMedium: UTMMedium | null = validateUtmMedium(utmParam)

    if (referral && utmMedium) {
      const response = NextResponse.next()
      const token = await generateJWT({
        referrer: referral,
        scope: "foo",
        utm_medium: utmMedium,
      })
      response.cookies.set("access_token", token)
      return response
    }
    return NextResponse.next()
  }

  if (!token) return NextResponse.redirect(new URL("/", request.url))

  try {
    const decoded = await verifyJWT(token)

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-access", JSON.stringify(decoded))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    // Token is invalid, remove it
    const response = NextResponse.next()
    response.cookies.delete("access_token")

    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  matcher: ["/", "/about/:path*", "/dashboard/:path*"],
}
