// backend/src/db.ts
import { Context } from "hono";
export function getDB(c: Context): any {
  return c.env.DB; // Cloudflare D1 binding
}
