import type { JWTPayload } from "@/types/auth/jwt"

import "server-only"

// Note: This file should only be imported in server-side code or API routes.
// Do not import this file in client-side code or React components.
import jwt from "jsonwebtoken"

// Make sure to set this in your environment variables
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables")
}

export function generateJWT(
  payload: JWTPayload,
  expiresIn: number = 3600
): string {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables")
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn })
    return token
  } catch (error) {
    console.error("Error generating JWT:", error)
    throw new Error("Failed to generate JWT")
  }
}

export function verifyJWT(token: string): jwt.JwtPayload | string {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables")
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    console.error("Error verifying JWT:", error)
    throw new Error("Invalid token")
  }
}
