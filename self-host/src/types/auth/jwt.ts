type JWTReferrer = "youtube" | "github" | "twitter" | "notion"

export type JWTPayload = {
  referrer: JWTReferrer
  storable: boolean
  scope: string
}
