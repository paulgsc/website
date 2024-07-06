import dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

// We need to make sure the in the tsconfig.json file, we need to change the target at least to 'ES6'
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
} satisfies Config
