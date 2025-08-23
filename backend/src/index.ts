export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    try {
      // GET all songs
      if (request.method === "GET" && pathname === "/api/songs") {
        const { results } = await env.DB.prepare("SELECT * FROM songs").all();
        return json(results);
      }

      // GET one song
      if (request.method === "GET" && pathname.startsWith("/api/songs/")) {
        const id = pathname.split("/").pop();
        const song = await env.DB.prepare("SELECT * FROM songs WHERE id = ?").bind(id).first();
        return song ? json(song) : notFound();
      }

      // CREATE song
      if (request.method === "POST" && pathname === "/api/songs") {
        const body = await request.json();
        env.DB.prepare(
          "INSERT INTO songs (title, artist, url) VALUES (?, ?, ?)"
        ).bind(body.title, body.artist, body.url).run();

        return json({ success: true });
      }

      // UPDATE song
      if (request.method === "PUT" && pathname.startsWith("/api/songs/")) {
        const id = pathname.split("/").pop();
        const body = await request.json();
        await env.DB.prepare(
          "UPDATE songs SET title = ?, artist = ?, url = ? WHERE id = ?"
        ).bind(body.title, body.artist, body.url, id).run();

        return json({ success: true });
      }

      // DELETE song
      if (request.method === "DELETE" && pathname.startsWith("/api/songs/")) {
        const id = pathname.split("/").pop();
        await env.DB.prepare("DELETE FROM songs WHERE id = ?").bind(id).run();
        return json({ success: true });
      }

      return notFound();
    } catch (err: any) {
      return json({ error: err.message }, 500);
    }
  },
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function notFound() {
  return new Response("Not found", { status: 404 });
}
