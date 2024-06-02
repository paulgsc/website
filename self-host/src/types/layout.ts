import { z } from "zod"

export const LayoutSchema = z.union([
  z.literal("channel"),
  z.literal("default"),
])

export const SafeValidLayoutSchema = z
  .string()
  .refine((s) => LayoutSchema.safeParse(s.trim()))

export const ValidLayoutSchema = z
  .string()
  .refine((s) => LayoutSchema.parse(s.trim()))

export const ValidatedLayoutSchema = LayoutSchema.refine((l) =>
  ValidLayoutSchema.parse(l)
)

export type Layouts = z.infer<typeof ValidatedLayoutSchema>
