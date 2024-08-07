import type { NextRequest, NextResponse } from "next/server"
import { decodeJwt, errors, jwtVerify, SignJWT } from "jose"

import type {
  AppUserRole,
  JWTCookeSessionKeys,
  JWTPayload,
  JWTRoleRequiredAction,
  RoleAccessPairs,
} from "@/types/auth/roles"
import {
  allowedRoleAccess,
  roleAccessPairSchema,
  roleSchema,
} from "@/types/auth/roles"

import "server-only"

import { KnownError } from "@/lib/errors"

// Make sure to set this in your environment variables
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables")
}

// Convert JWT_SECRET to Uint8Array
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function generateJWT(
  payload: JWTPayload,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
      .sign(secretKey)
    return token
  } catch (error) {
    console.error("Error generating JWT:", error)
    throw new Error("Failed to generate JWT")
  }
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload as JWTPayload
  } catch (error) {
    if (error instanceof errors.JWTExpired)
      throw new KnownError("Token expired")
    throw new Error("Invalid token")
  }
}

export function getJwtCookie<T extends NextRequest>(
  request: T,
  k: JWTCookeSessionKeys
): string | undefined {
  return request.cookies.get(k)?.value
}

export function deleteJwtCookie<T extends NextResponse>(
  response: T,
  k: JWTCookeSessionKeys
): void {
  response.cookies.delete(k)
}

export async function setJwtCookie<T extends NextResponse>(
  response: T,
  k: JWTCookeSessionKeys,
  tokenPromise: Promise<string>
): Promise<void> {
  const token = await tokenPromise
  response.cookies.set(k, token)
}

export async function getJwtCookieAction(
  token: string | undefined
): Promise<JWTRoleRequiredAction> {
  if (!token) {
    return "new"
  }

  try {
    await verifyJWT(token)
    return "keep"
  } catch (error) {
    if (error instanceof KnownError) return "refresh"
    return "reset"
  }
}

export function getValidRoleFromParam(request: NextRequest): AppUserRole {
  const { searchParams } = new URL(request.url)
  const roleParam = searchParams.get("referrer") ?? ("unknown" as AppUserRole)
  return roleSchema.parse(roleParam)
}

export function getValidRoleFromToken(token: string | undefined): AppUserRole {
  if (!token) throw new KnownError("Token is not set!")

  const payload = decodeJwt(token)
  const { scope } = payload
  const validatedScope = roleAccessPairSchema.partial().parse(scope)
  return roleSchema.parse(Object.keys(validatedScope)[0])
}

export function getValidRoleFromExpiredToken(
  token: string | undefined
): AppUserRole {
  if (!token) throw new KnownError("Token is not set!")

  const payload = decodeJwt(token)
  const { scope } = payload
  const validatedScope = roleAccessPairSchema.partial().parse(scope)
  return roleSchema.parse(Object.keys(validatedScope)[0])
}

export function getValidRoleAcessPair(
  role: AppUserRole
): Partial<RoleAccessPairs> {
  return { [role]: allowedRoleAccess[role] }
}

export function generateJwtPayload(
  access: Partial<RoleAccessPairs>
): JWTPayload {
  return {
    referrer: "github",
    scope: access,
    utm_medium: "recruiter",
  }
}
