// For Cloudflare D1 (recommended for Workers)
import { D1Database } from '@cloudflare/workers-types';

export function getDB(c: any): D1Database {
  // Assumes you have bound D1 as 'DB' in wrangler.toml
  return c.env.DB;
}