import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// Uncomment schema declarations when schemas added
// import * as schema from "./schema.js";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const queryClient = postgres(process.env.DATABASE_URL);

export const db = drizzle({
  client: queryClient,
  // schema,
  casing: "snake_case",
});

// export * from "./schema.js";
