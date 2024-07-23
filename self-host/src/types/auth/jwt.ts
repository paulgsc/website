export type JWTReferrer = "youtube" | "github" | "twitter" | "notion"
export type UTMMedium = "sponsor" | "recruiter" | "member"
export type JWTPayload = {
  referrer: JWTReferrer
  utm_medium: UTMMedium
  scope: string
}

export function validateReferrer(ref: string | null): JWTReferrer | null {
  if (ref) {
    const validReferrers: Array<JWTReferrer> = [
      "youtube",
      "github",
      "twitter",
      "notion",
    ]

    if (validReferrers.includes(ref as JWTReferrer)) {
      return ref as JWTReferrer
    }
  }

  return null
}

export function validateUtmMedium(ref: string | null): UTMMedium | null {
  if (ref) {
    const validReferrers: Array<UTMMedium> = ["member", "recruiter", "sponsor"]

    if (validReferrers.includes(ref as UTMMedium)) {
      return ref as UTMMedium
    }
  }

  return null
}
