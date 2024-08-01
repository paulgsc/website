import type { RoleAccessPairs } from "@/types/auth/roles"
import { roleAccessPairSchema } from "@/types/auth/roles"

// Jest tests
describe("roleAccessPairSchema", () => {
  test("should pass for valid superuser access", () => {
    const validUserPermission: Partial<RoleAccessPairs> = {
      superuser: ["blog", "events", "fundme", "personal", "portfolio", "trial"],
    }
    const result = roleAccessPairSchema.partial().safeParse(validUserPermission)
    expect(result.success).toBe(true)
  })

  test("should fail for a nonsense role", () => {
    const invalidUserPermission = {
      nonsenserole: ["blog", "events"],
    }
    const result = roleAccessPairSchema.safeParse(invalidUserPermission)
    expect(result.success).toBe(false)
  })

  test("should fail for a nonsense access value", () => {
    const invalidUserPermission = {
      superuser: ["blog", "events", "nonsenseaccess"],
    }
    const result = roleAccessPairSchema
      .partial()
      .safeParse(invalidUserPermission)
    expect(result.success).toBe(false)
  })

  test("should fail for role with fewer than possible permissions", () => {
    const invalidUserPermission: Partial<RoleAccessPairs> = {
      superuser: ["fundme"],
    }
    const result = roleAccessPairSchema
      .partial()
      .safeParse(invalidUserPermission)
    expect(result.success).toBe(false)
  })

  test("should fail for role with more permissions than actual", () => {
    const invalidUserPermission = {
      recruiter: ["portfolio", "events"],
    }
    const result = roleAccessPairSchema
      .partial()
      .safeParse(invalidUserPermission)
    expect(result.success).toBe(false)
  })

  test("should pass for multiple valid roles", () => {
    const validUserPermission: Partial<RoleAccessPairs> = {
      subscriber: ["portfolio", "events", "blog"],
      superuser: ["blog", "fundme", "trial", "events", "personal", "portfolio"],
    }
    const result = roleAccessPairSchema.partial().safeParse(validUserPermission)
    expect(result.success).toBe(true)
  })

  test("should fail for mixed valid and invalid roles", () => {
    const invalidUserPermission = {
      subscriber: ["portfolio", "events"],
      superuser: ["blog", "fundme", "trial"],
      nonsenserole: ["blog", "events"],
    }
    const result = roleAccessPairSchema.safeParse(invalidUserPermission)
    expect(result.success).toBe(false)
  })

  test("should fail for multiple roles, not all provided", () => {
    const validUserPermission: Partial<RoleAccessPairs> = {
      subscriber: ["portfolio", "events"],
      superuser: ["blog", "fundme", "trial"],
    }
    const result = roleAccessPairSchema.partial().safeParse(validUserPermission)
    expect(result.success).toBe(false)
  })
})
