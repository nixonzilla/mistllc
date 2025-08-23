// src/index.ts
import { D1Database } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const queryDB = async (sql: string, params?: any[]) => {
      const res = await env.DB.prepare(sql).bind(...(params || [])).all();
      return res.results;
    };

    try {
      // GET /songs
      if (request.method === 'GET' && pathname === '/songs') {
        const songs = await queryDB('SELECT * FROM songs ORDER BY created_at DESC');
        return new Response(JSON.stringify(songs), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // POST /songs
      if (request.method === 'POST' && pathname === '/songs') {
        const body: { title?: string; artiste?: string } = await request.json();
        const { title, artiste } = body;

        if (!title || !artiste) {
          return new Response(JSON.stringify({ error: 'title and artiste are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const result = await queryDB(
          'INSERT INTO songs (title, artiste, created_at) VALUES (?, ?, datetime(\'now\')) RETURNING *',
          [title, artiste]
        );

        return new Response(JSON.stringify(result[0]), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // PUT /songs/:id
      if (request.method === 'PUT' && pathname.startsWith('/songs/')) {
        const id = pathname.split('/')[2];
        const body: { title?: string; artiste?: string } = await request.json();
        const { title, artiste } = body;

        if (!title && !artiste) {
          return new Response(JSON.stringify({ error: 'title or artiste is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const fields = [];
        const values = [];

        if (title) {
          fields.push('title = ?');
          values.push(title);
        }
        if (artiste) {
          fields.push('artiste = ?');
          values.push(artiste);
        }
        values.push(id);

        const result = await queryDB(
          `UPDATE songs SET ${fields.join(', ')} WHERE id = ? RETURNING *`,
          values
        );

        return new Response(JSON.stringify(result[0] || {}), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // DELETE /songs/:id
      if (request.method === 'DELETE' && pathname.startsWith('/songs/')) {
        const id = pathname.split('/')[2];

        await queryDB('DELETE FROM songs WHERE id = ?', [id]);

        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response('Not Found', { status: 404 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err instanceof Error ? err.message : err }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
