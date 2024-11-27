import { z } from 'zod';

export const getEnv = () =>
  z
    .object({
      NEXT_PUBLIC_BASE_URL: z.string().url().default('https://localhost:3000'),
      GROQ_API_KEY: z.string(),
    })
    .parse(process.env);
