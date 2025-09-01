import { z } from "zod";

const envSchema = z.object({
  // DATABASE_URL may be undefined during build time (e.g. on Vercel),
  // so mark it as optional to avoid validation errors when the variable
  // isn't provided.
  DATABASE_URL: z.string().url().optional(),
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_ORG: z.string().optional(),
});

export const env = envSchema.parse({
  // Some platforms expose empty strings for missing env vars. Convert
  // falsy values to `undefined` so optional validation passes instead of
  // throwing an "Invalid url" error during builds.
  DATABASE_URL: process.env.DATABASE_URL || undefined,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_ORG: process.env.OPENAI_ORG,
});

