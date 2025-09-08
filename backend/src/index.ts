import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Cloudflare D1 type (so TS doesn’t complain)
interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): {
      all<T = unknown>(): Promise<{ results: T[] }>
      first<T = unknown>(): Promise<T | null>
    }
    all<T = unknown>(): Promise<{ results: T[] }>
    first<T = unknown>(): Promise<T | null>
  }
}

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for frontend
app.use('*', cors())

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok', message: '🎵 mistllc backend is running' }))

// Fetch all songs
app.get('/api/songs', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`SELECT * FROM songs`).all()
    return c.json(results)
  } catch (err) {
    return c.json({ error: 'Failed to fetch songs', details: String(err) }, 500)
  }
})

// Fetch single song by ID
app.get('/api/songs/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const result = await c.env.DB.prepare(`SELECT * FROM songs WHERE id = ?`)
      .bind(id)
      .first()
    if (!result) return c.json({ error: 'Song not found' }, 404)
    return c.json(result)
  } catch (err) {
    return c.json({ error: 'Failed to fetch song', details: String(err) }, 500)
  }
})

export default app
