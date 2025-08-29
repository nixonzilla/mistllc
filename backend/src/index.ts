import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Context } from 'hono'
import { D1Database } from '@cloudflare/workers-types'
import { SongRow } from '../../shared/types/db'
import songsRoute from "./routes/songs";

type Bindings = {
  DB: D1Database
}

export const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

// Health check
app.get('/health', (c: Context) => c.text('Backend is healthy ✅'))

// Get all songs
app.get('/songs', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM songs').all<SongRow>()
  return c.json(results)
})

// Add a new song
app.post('/songs', async (c) => {
  const body = await c.req.json<SongRow>()
  if (!body.title || !body.artist) return c.json({ error: 'Missing fields' }, 400)

  const stmt = c.env.DB.prepare(
    'INSERT INTO songs (title, artist) VALUES (?1, ?2) RETURNING *'
  ).bind(body.title, body.artist)

  const row = await stmt.first<SongRow>()
  return c.json(row)
})

// Update a song
app.put('/songs/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json<SongRow>()

  const stmt = c.env.DB.prepare(
    'UPDATE songs SET title = ?1, artist = ?2 WHERE id = ?3 RETURNING *'
  ).bind(body.title, body.artist, id)

  const row = await stmt.first<SongRow>()
  if (!row) return c.json({ error: 'Not found' }, 404)

  return c.json(row)
})

// Delete a song
app.delete('/songs/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const stmt = c.env.DB.prepare('DELETE FROM songs WHERE id = ?1').bind(id)
  const info = await stmt.run()

  if (info.meta.changes === 0) return c.json({ error: 'Not found' }, 404)

  return c.json({ success: true })
})

export default app
app.get("/", (c) => c.text("🎵 mistllc backend is running"))
export const handler = app.fetch
export { songsRoute };
// Root check
app.get("/", (c) => c.text("MISTLLC Backend is running!"));
// Mount songs API
app.route("/songs", songsRoute);