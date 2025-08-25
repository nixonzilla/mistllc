import { Hono } from "hono";

const songsRouter = new Hono();

// Mock DB
let songs: { id: number; title: string; artist: string }[] = [
  { id: 1, title: "First Song", artist: "MISTLLC" },
];

// GET all songs
songsRouter.get("/", (c) => c.json(songs));

// POST new song
songsRouter.post("/", async (c) => {
  const body = await c.req.json();
  const newSong = { id: Date.now(), ...body };
  songs.push(newSong);
  return c.json(newSong, 201);
});

// PUT update song
songsRouter.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  songs = songs.map((s) => (s.id === id ? { ...s, ...body } : s));
  return c.json({ success: true });
});

// DELETE song
songsRouter.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  songs = songs.filter((s) => s.id !== id);
  return c.json({ success: true });
});

export default songsRouter;
