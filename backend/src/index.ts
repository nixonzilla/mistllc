import { KVNamespace, ExecutionContext } from "@cloudflare/workers-types";

export interface Env {
  mistllc: KVNamespace; // Your KV namespace binding
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    // Route requests
    if (url.pathname === "/") {
      return new Response("Welcome to MISTLLC!", {
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (url.pathname.startsWith("/kv/")) {
      const key = url.pathname.replace("/kv/", "");

      if (request.method === "GET") {
        const value = await env.mistllc.get(key);
        if (value === null) {
          return new Response("Key not found", { status: 404 });
        }
        return new Response(value, { status: 200 });
      }

      if (request.method === "PUT") {
        const body = await request.text();
        await env.mistllc.put(key, body);
        return new Response("OK", { status: 200 });
      }

      if (request.method === "DELETE") {
        await env.mistllc.delete(key);
        return new Response("Deleted", { status: 200 });
      }

      return new Response("Method Not Allowed", { status: 405 });
    }

    return new Response("Not Found", { status: 404 });
  },
};
