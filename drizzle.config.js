import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from './config/env.js';
config({ path: '.env' });
export default defineConfig({
  schema: "./db/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
