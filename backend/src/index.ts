import { Env, UserRow } from "../shared/types";

// Utility: JSON response with CORS headers
function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // ── Health check ──
    if (pathname === "/health") {
      return jsonResponse({ status: "ok", service: "mistllc-backend" });
    }

    // ── Users ──
    if (pathname === "/users" && request.method === "GET") {
      try {
        const { results } = await env.DB.prepare(
          "SELECT id, name, email FROM users"
        ).all();

        // Cast results safely to UserRow[]
        return jsonResponse(results as UserRow[]);
      } catch (err) {
        return jsonResponse({ error: (err as Error).message }, 500);
      }
    }

    if (pathname === "/users" && request.method === "POST") {
      try {
        const data = (await request.json()) as Partial<UserRow>;

        if (!data.name || !data.email) {
          return jsonResponse({ error: "Missing name or email" }, 400);
        }

        const { success } = await env.DB.prepare(
          "INSERT INTO users (name, email) VALUES (?1, ?2)"
        )
          .bind(data.name, data.email)
          .run();

        return jsonResponse({ success });
      } catch (err) {
        return jsonResponse({ error: (err as Error).message }, 500);
      }
    }

    if (pathname.startsWith("/users/") && request.method === "PUT") {
      try {
        const id = Number(pathname.split("/")[2]);
        const data = (await request.json()) as Partial<UserRow>;

        if (!id || (!data.name && !data.email)) {
          return jsonResponse({ error: "Missing ID or update fields" }, 400);
        }

        const { success } = await env.DB.prepare(
          "UPDATE users SET name = COALESCE(?1, name), email = COALESCE(?2, email) WHERE id = ?3"
        )
          .bind(data.name ?? null, data.email ?? null, id)
          .run();

        return jsonResponse({ success });
      } catch (err) {
        return jsonResponse({ error: (err as Error).message }, 500);
      }
    }

    if (pathname.startsWith("/users/") && request.method === "DELETE") {
      try {
        const id = Number(pathname.split("/")[2]);

        if (!id) {
          return jsonResponse({ error: "Missing ID" }, 400);
        }

        const { success } = await env.DB.prepare(
          "DELETE FROM users WHERE id = ?1"
        )
          .bind(id)
          .run();

        return jsonResponse({ success });
      } catch (err) {
        return jsonResponse({ error: (err as Error).message }, 500);
      }
    }

    // ── Not Found ──
    return jsonResponse({ error: "Not found" }, 404);
  },
};
