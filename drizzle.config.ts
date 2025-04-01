import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    dialect: 'postgresql', // Change dialect to 'pg' for PostgreSQL
    schema: './server/database/schema.ts',
    out: './server/database/migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Ensure DATABASE_URL points to your PostgreSQL database
    }
})