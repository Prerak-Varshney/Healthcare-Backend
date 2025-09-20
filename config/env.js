import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    NODE_ENV,
    PORT,
    DATABASE_URL,
    JWT_SECRET
    
} = process.env;