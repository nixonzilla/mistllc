import { Hono } from "hono";

type Song = {
  id: number;
  title: string;
  artist: string;
};

const songs: Song[] = [
  { id: 1, title: "Drippy", artist: "MISTLLC" },
  { id: 2, title: "Dreamwave", artist: "MISTLLC" },
  { id: 3, title: "Sunset Boulevard", artist: "MISTLLC" },
  { id: 4, title: "Neon Nights", artist: "MISTLLC" },
  { id: 5, title: "City Lights", artist: "MISTLLC" },
  { id: 6, title: "Midnight Drive", artist: "MISTLLC" },
  { id: 7, title: "Electric Dreams", artist: "MISTLLC" },
  { id: 8, title: "Future Bass", artist: "MISTLLC" },
  { id: 9, title: "Synthwave", artist: "MISTLLC" },
  { id: 10, title: "Chill Vibes", artist: "MISTLLC" },
];

let nextId = songs.length + 1;

export const songsRoute = new Hono()
  // --- Get all songs ---
  .get("/", (c) => {
    return c.json(songs);
  })

  // --- Add a song ---
  .post("/", async (c) => {
    const body = await c.req.json<{ title: string; artist: string }>();
    const newSong: Song = { id: nextId++, ...body };
    songs.push(newSong);
    return c.json(newSong, 201);
  })

  // --- Update a song ---
  .put("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json<Partial<Omit<Song, "id">>>();
    const song = songs.find((s) => s.id === id);
    if (!song) return c.json({ error: "Song not found" }, 404);

    if (body.title !== undefined) song.title = body.title;
    if (body.artist !== undefined) song.artist = body.artist;

    return c.json(song);
  })

  // --- Delete a song ---
  .delete("/:id", (c) => {
    const id = Number(c.req.param("id"));
    const index = songs.findIndex((s) => s.id === id);
    if (index === -1) return c.json({ error: "Song not found" }, 404);

    songs.splice(index, 1);
    return c.json({ success: true });
  });
export default songsRoute;