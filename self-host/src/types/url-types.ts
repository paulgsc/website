import * as z from "zod";
/*
 *@todo add test
 */
const urlRegex =
  /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$|^\/[\w/]*$/;

const validUrlSchema = z
  .string()
  .regex(urlRegex, { message: "Invalid URL or route" });

export type ValidUrlOrLocalRoute = z.infer<typeof validUrlSchema>;
