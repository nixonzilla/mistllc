import { KVNamespace, ExecutionContext } from "@cloudflare/workers-types";

export interface Env {
  mistllc: KVNamespace; // <-- matches wrangler.toml binding
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/get") {
      const value = await env.mistllc.get("greeting");
      return new Response(value ?? "Nothing stored yet in KV!");
    }

    if (url.pathname === "/set") {
      await env.mistllc.put("greeting", "Hello from mistllc!");
      return new Response("Stored greeting in KV ✅");
    }

    return new Response("MISTLLC Worker is running 🚀", {
      headers: { "content-type": "text/plain" },
    });
  },
};
