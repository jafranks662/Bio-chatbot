import { z } from "zod";

const optionalString = () =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const normalized = value.trim();
      return normalized.length > 0 ? normalized : undefined;
    },
    z.string().optional(),
  );

const envSchema = z.object({
  // DATABASE_URL may be undefined during build time (e.g. on Vercel),
  // so mark it as optional to avoid validation errors when the variable
  // isn't provided.
  DATABASE_URL: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const normalized = value.trim();
      return normalized.length > 0 ? normalized : undefined;
    },
    z.string().url().optional(),
  ),
  // OPENAI_API_KEY is only required when calling the chat API at runtime.
  // Keep it optional during build to avoid static build failures.
  OPENAI_API_KEY: optionalString(),
  OPENAI_ORG: optionalString(),
  OPENAI_BASE_URL: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const normalized = value.trim();
      return normalized.length > 0 ? normalized : undefined;
    },
    z.string().url().optional(),
  ),
});

export const env = envSchema.parse({
  // Some platforms expose empty strings for missing env vars. Normalize
  // those to `undefined` so optional validation passes during builds.
  DATABASE_URL: process.env.DATABASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_ORG: process.env.OPENAI_ORG,
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
});
