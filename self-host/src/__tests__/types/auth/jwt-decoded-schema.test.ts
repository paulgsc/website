import type { JWTPayload } from "@/types/auth/roles"
import { jwtPayloadSchema } from "@/types/auth/roles"

describe("jwtPayloadSchema", () => {
  test("should pass for valid payload", () => {
    const validPayload: JWTPayload = {
      referrer: "github",
      utm_medium: "member",
      scope: {
        superuser: [
          "blog",
          "events",
          "fundme",
          "personal",
          "portfolio",
          "trial",
        ],
      },
    }
    const result = jwtPayloadSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  test("should fail for invalid referrer", () => {
    const invalidPayload = {
      referrer: "invalidReferrer",
      utm_medium: "member",
      scope: {
        superuser: [
          "blog",
          "events",
          "fundme",
          "personal",
          "portfolio",
          "trial",
        ],
      },
    }
    const result = jwtPayloadSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  test("should fail for invalid utm_medium", () => {
    const invalidPayload = {
      referrer: "github",
      utm_medium: "invalidMedium",
      scope: {
        superuser: [
          "blog",
          "events",
          "fundme",
          "personal",
          "portfolio",
          "trial",
        ],
      },
    }
    const result = jwtPayloadSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  test("should fail for invalid scope structure", () => {
    const invalidPayload = {
      referrer: "github",
      utm_medium: "member",
      scope: {
        superuser: ["blog", "invalidAccess", "trial"],
      },
    }
    const result = jwtPayloadSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  test("should fail for missing keys", () => {
    const invalidPayload = {
      referrer: "github",
      utm_medium: "member",
    }
    const result = jwtPayloadSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  test("should fail for additional keys", () => {
    const invalidPayload = {
      referrer: "github",
      utm_medium: "member",
      scope: {
        superuser: [
          "blog",
          "events",
          "fundme",
          "personal",
          "portfolio",
          "trial",
        ],
      },
      extraKey: "extraValue",
    }
    const result = jwtPayloadSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })
})
