import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BASE_URL: z.string().url(),
    AZURE_AD_CLIENT_ID: z.string(),
    AZURE_AD_CLIENT_SECRET: z.string(),
    AZURE_AD_TENANT_ID: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    DISCORD_BOT_TOKEN: z.string(),
    DISCORD_GUILD_ID: z.string(),
    DISCORD_ROLE_IDS: z.string().array(),
  },
  runtimeEnv: {
    BASE_URL: process.env.BASE_URL,
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
    DISCORD_ROLE_IDS: process.env.DISCORD_ROLE_IDS?.split(',') ?? [],
  },
});
