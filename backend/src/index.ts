export interface Env {
  MY_SECRET: string;
  // Example of binding a KV namespace:
  // MY_KV_NAMESPACE: KVNamespace;
  // You can add secrets/environment variables here as well.
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Example: Read a secret environment variable (set via `wrangler secret put`)
    const secretValue = env.MY_SECRET || "secret not set";

    // Simple routing example:
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/api/secret") {
      return new Response(`Secret value is: ${secretValue}`, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Default response
    return new Response("Hello from MISTLLC backend on Cloudflare Workers!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
