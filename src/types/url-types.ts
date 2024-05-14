import * as z from "zod";
/*
 *@todo add test
 */
const urlRegex =
  /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$|^\/[\w/]*$/;

const validUrlSchema = z.object({
  link: z.string().regex(urlRegex, { message: "Invalid URL or route" }),
  label: z.string(),
  target: z.string().optional(),
});

export type ValidUrlOrLocalRoute = z.infer<typeof validUrlSchema>;
