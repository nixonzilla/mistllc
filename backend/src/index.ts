export interface Env {
  DB: D1Database; // comes from wrangler.toml binding
  NODE_ENV: string;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    // GET /songs -> fetch all
    if (url.pathname === "/songs" && req.method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM songs ORDER BY created_at DESC").all();
      return Response.json(results);
    }

    // POST /songs -> create new song
    if (url.pathname === "/songs" && req.method === "POST") {
      const body = await req.json<{ title: string; artiste: string }>();
      if (!body.title || !body.artiste) {
        return new Response("Missing fields", { status: 400 });
      }

      await env.DB.prepare(
        "INSERT INTO songs (title, artiste) VALUES (?1, ?2)"
      ).bind(body.title, body.artiste).run();

      return new Response("Song created", { status: 201 });
    }

    // PUT /songs/:id -> update
    if (url.pathname.startsWith("/songs/") && req.method === "PUT") {
      const id = url.pathname.split("/")[2];
      const body = await req.json<{ title?: string; artiste?: string }>();

      await env.DB.prepare(
        "UPDATE songs SET title = COALESCE(?1, title), artiste = COALESCE(?2, artiste) WHERE id = ?3"
      ).bind(body.title ?? null, body.artiste ?? null, id).run();

      return new Response("Song updated", { status: 200 });
    }

    // DELETE /songs/:id -> delete
    if (url.pathname.startsWith("/songs/") && req.method === "DELETE") {
      const id = url.pathname.split("/")[2];
      await env.DB.prepare("DELETE FROM songs WHERE id = ?1").bind(id).run();
      return new Response("Song deleted", { status: 200 });
    }

    // fallback
    return new Response("Not found", { status: 404 });
  },
};
