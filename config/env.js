import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    NODE_ENV,
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    ARCJET_KEY,
    ARCJET_ENV,
    
} = process.env;