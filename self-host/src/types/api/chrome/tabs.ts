import { z } from "zod"

const MutedInfoSchema = z.object({
  // Define MutedInfo schema here if needed
})

export const TabSchema = z.object({
  status: z.enum(["loading", "complete"]),
  index: z.number(),
  openerTabId: z.number(),
  title: z.string(),
  url: z.string(),
  pendingUrl: z.string(),
  pinned: z.boolean(),
  highlighted: z.boolean(),
  windowId: z.number(),
  active: z.boolean(),
  favIconUrl: z.string(),
  id: z.number(),
  incognito: z.boolean(),
  selected: z.boolean(),
  audible: z.boolean(),
  discarded: z.boolean(),
  autoDiscardable: z.boolean(),
  mutedInfo: MutedInfoSchema,
  width: z.number(),
  height: z.number(),
  sessionId: z.string(),
  groupId: z.number(),
  lastAccessed: z.number(),
})

export type Tab = z.infer<typeof TabSchema>
