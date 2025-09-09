import { Hono } from "hono";
import { cors } from "hono/cors";
import { D1Database } from "@cloudflare/workers-types";

const app = new Hono<{ Bindings: { DB: D1Database } }>();

// Enable CORS for frontend
app.use("*", cors());

// Root route
app.get("/", (c) => c.text("🎵 MISTLLC backend is running"));

// Fetch songs from D1
app.get("/songs", async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT id, title, artist, created_at FROM songs ORDER BY created_at DESC"
    ).all();

    return c.json(results);
  } catch (err: any) {
    console.error("DB error:", err);
    return c.json({ error: "Failed to fetch songs" }, 500);
  }
});

export default app;
