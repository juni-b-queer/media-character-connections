import { drizzle } from 'drizzle-orm/postgres-js'; // Use the Bun-specific adapter for Drizzle ORM
export { sql, eq, and, or } from 'drizzle-orm';
import postgres from 'postgres';

import * as schema from '../database/schema';


// Initialize PostgreSQL connection
const queryClient = postgres(process.env.DATABASE_URL);

export const tables = schema;

export function useDrizzle() {
    return drizzle(queryClient, { schema, mode: 'default' });
}

export type Season = typeof schema.season.$inferSelect; // Infer Season type
export type Episode = typeof schema.episode.$inferSelect; // Infer Episode type
export type Sketch = typeof schema.sketch.$inferSelect; // Infer Sketch type
