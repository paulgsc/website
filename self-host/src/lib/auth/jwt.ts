import { jwtVerify, SignJWT } from "jose"

import type { JWTPayload } from "@/types/auth/jwt"

import "server-only"

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
    console.error("Error verifying JWT:", error)
    throw new Error("Invalid token")
  }
}
