import type { NextRequest } from "next/server"
import { middleware } from "@/middleware"
import { createMocks } from "node-mocks-http"

import { generateJWT, verifyJWT } from "@/lib/auth/jwt" // adjust the import path as needed

jest.mock("@/lib/auth/jwt", () => ({
  generateJWT: jest.fn(),
  verifyJWT: jest.fn(),
}))

describe("Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should only run on specified routes", async () => {
    const { req, res } = createMocks({
      method: "GET",
      url: "/unspecified-route",
    })

    await middleware(req as unknown as NextRequest)

    expect(res.statusCode).toBe(200) // NextResponse.next() was called
    expect(generateJWT).not.toHaveBeenCalled()
    expect(verifyJWT).not.toHaveBeenCalled()
  })

  describe('Root route ("/")', () => {
    it("should verify existing token if present", async () => {
      const { req, res } = createMocks({
        method: "GET",
        url: "/",
        cookies: { access_token: "valid_token" },
      })

      ;(verifyJWT as jest.Mock).mockResolvedValueOnce({ valid: true })

      await middleware(req as unknown as NextRequest)

      expect(verifyJWT).toHaveBeenCalledWith("valid_token")
      expect(generateJWT).not.toHaveBeenCalled()
      expect(res.statusCode).toBe(200) // NextResponse.next() was called
    })

    it("should create new token if no valid token and valid params", async () => {
      const { req, res } = createMocks({
        method: "GET",
        url: "/?referrer=valid_referrer&utm_medium=valid_utm",
      })

      ;(generateJWT as jest.Mock).mockResolvedValueOnce("new_token")

      await middleware(req as unknown as NextRequest)

      expect(generateJWT).toHaveBeenCalledWith(
        expect.objectContaining({
          referrer: "valid_referrer",
          utm_medium: "valid_utm",
        })
      )
      expect(res.getHeader("Set-Cookie")).toContain("access_token=new_token")
    })

    it("should not create new token if params are invalid", async () => {
      const { req, res } = createMocks({
        method: "GET",
        url: "/?referrer=invalid&utm_medium=invalid",
      })

      await middleware(req as unknown as NextRequest)

      expect(generateJWT).not.toHaveBeenCalled()
      expect(res.getHeader("Set-Cookie")).toBeUndefined()
    })
  })

  describe("Other specified routes", () => {
    it("should verify token and set header if valid", async () => {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { req, res } = createMocks({
        method: "GET",
        url: "/dashboard",
        cookies: { access_token: "valid_token" },
      })

      ;(verifyJWT as jest.Mock).mockResolvedValueOnce({ user: "data" })

      await middleware(req as unknown as NextRequest)

      expect(verifyJWT).toHaveBeenCalledWith("valid_token")
      expect(req.headers["x-user-access"]).toBe(
        JSON.stringify({ user: "data" })
      )
    })

    it("should redirect to root if token is invalid", async () => {
      const { req, res } = createMocks({
        method: "GET",
        url: "/dashboard",
        cookies: { access_token: "invalid_token" },
      })

      ;(verifyJWT as jest.Mock).mockRejectedValueOnce(
        new Error("Invalid token")
      )

      await middleware(req as unknown as NextRequest)

      expect(verifyJWT).toHaveBeenCalledWith("invalid_token")
      expect(res.statusCode).toBe(307) // Temporary redirect
      expect(res.getHeader("Location")).toBe("/")
    })

    it("should redirect to root if no token present", async () => {
      const { req, res } = createMocks({
        method: "GET",
        url: "/dashboard",
      })

      await middleware(req as unknown as NextRequest)

      expect(res.statusCode).toBe(307) // Temporary redirect
      expect(res.getHeader("Location")).toBe("/")
    })
  })
})
