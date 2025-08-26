import { Hono } from "hono";
import { getDB } from "../db";

const songs = new Hono();

// GET all songs
songs.get("/", async (c) => {
  const db = getDB(c);
  const result = await db.prepare("SELECT id, title, artist FROM songs").all();
  return c.json(result.results ?? []);
});

// POST new song
songs.post("/", async (c) => {
  const db = getDB(c);
  const body = await c.req.json<{ title: string; artist: string }>();

  if (!body.title || !body.artist) {
    return c.json({ error: "Title and artist are required" }, 400);
  }

  await db
    .prepare("INSERT INTO songs (title, artist) VALUES (?, ?)")
    .bind(body.title, body.artist)
    .run();

  return c.json({ success: true });
});

export default songs;
