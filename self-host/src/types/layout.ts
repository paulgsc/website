import { z } from "zod"

function createValidatedSchema<
  T extends [z.ZodLiteral<string>, ...Array<z.ZodLiteral<string>>],
>(baseSchema: z.ZodUnion<T>) {
  const safeSchema = z
    .string()
    .refine((s) => baseSchema.safeParse(s.trim()).success)

  const strictSchema = z.string().refine((s) => baseSchema.parse(s.trim()))

  const validatedSchema = baseSchema.refine((value) =>
    strictSchema.parse(value)
  )

  return {
    base: baseSchema,
    safe: safeSchema,
    strict: strictSchema,
    validated: validatedSchema,
  }
}

export const BlogLayoutSchema = z.union([
  z.literal("channel"),
  z.literal("default"),
])

const parseBlogLayout = createValidatedSchema(BlogLayoutSchema)

export const SafeValidBlogLayoutSchema = parseBlogLayout.safe

export const ValidatedBlogLayoutSchema = parseBlogLayout.validated

export type BlogLayoutType = z.infer<typeof parseBlogLayout.validated>

export const ProjectsLayoutSchema = z.union([
  z.literal("membame"),
  z.literal("membame/charts"),
  z.literal("streaming/banners"),
  z.literal("my-superpowers"),
  z.literal("default"),
])

const parseProjectsLayout = createValidatedSchema(ProjectsLayoutSchema)

export type ProjectsLayoutType = z.infer<typeof parseProjectsLayout.validated>

export const ValidatedProjectsSchema = parseProjectsLayout.validated
