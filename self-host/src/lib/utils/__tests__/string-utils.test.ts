import { describe, expect, it } from "vitest"

import {
  isEnclosedWithBrackets,
  isEnclosedWithParentheses,
} from "@/lib/utils/string-utils"

describe("isEnclosedWithParentheses", () => {
  it("should return true for strings enclosed with parentheses", () => {
    expect(isEnclosedWithParentheses("(example)")).toBe(true)
    expect(isEnclosedWithParentheses("(another example)")).toBe(true)
  })

  it("should return false for strings not enclosed with parentheses", () => {
    expect(isEnclosedWithParentheses("example")).toBe(false)
    expect(isEnclosedWithParentheses("(example")).toBe(false)
    expect(isEnclosedWithParentheses("example)")).toBe(false)
    expect(isEnclosedWithParentheses("(example) extra")).toBe(false)
  })
})

describe("isEnclosedWithBrackets", () => {
  it("should return true for valid Next.js dynamic slug routes", () => {
    expect(isEnclosedWithBrackets("[...example]")).toBe(true)
    expect(isEnclosedWithBrackets("[[...anotherExample]]")).toBe(true)
    expect(isEnclosedWithBrackets("[...anotherExample_foo]")).toBe(true)
  })

  it("should return false for strings not valid as Next.js dynamic slug routes", () => {
    expect(isEnclosedWithBrackets("example")).toBe(false)
    expect(isEnclosedWithBrackets("example]")).toBe(false)
  })
})
