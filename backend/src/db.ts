// backend/src/db.ts
import { Context } from "hono";

export function getDB(c: Context) {
  return c.env.DB; // Cloudflare D1 binding
}
