import { z } from "zod"

// Activity schema
const activitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Assuming YYYY-MM-DD format
  count: z.number().int().nonnegative(),
  level: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
})

// ApiResponse schema
export const apiResponseSchema = z.object({
  total: z.record(
    z.union([z.number().int(), z.string()]),
    z.number().int().nonnegative()
  ),
  contributions: z.array(activitySchema),
})

// ApiErrorResponse schema
export const apiErrorResponseSchema = z.object({
  error: z.string(),
})

export type ApiResponseSchema = z.infer<typeof apiResponseSchema>
export type ApiErrorResponseSchema = z.infer<typeof apiErrorResponseSchema>
