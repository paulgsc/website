import { nanoid } from "nanoid"
import { z } from "zod"

const ContentType = z.enum(["text", "file"])
const CreatorType = z.enum(["anonymousPlatypus", "chatbot", "authorizedUser"])

const MessageSchema = z.object({
  id: z.string().default(nanoid),
  contentType: ContentType,
  content: z.union([
    z.string().max(500, "Text content must be at most 500 characters long"),
    z
      .instanceof(File)
      .refine((file) => file.size > 0, "File content must not be empty"),
  ]),
  createdBy: CreatorType,
  createdAt: z.date(),
})

export type MessageType = z.infer<typeof MessageSchema>
