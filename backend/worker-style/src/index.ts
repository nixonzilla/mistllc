export interface Env {
  mistllc: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/store") {
      try {
        const body = await request.json() as { key?: string; value?: string };

        if (!body.key || !body.value) {
          return new Response("Missing key or value", { status: 400 });
        }

        await env.mistllc.put(body.key, body.value);
        return new Response(`Stored ${body.key} = ${body.value}`, { status: 200 });
      } catch (err) {
        return new Response("Invalid JSON body", { status: 400 });
      }
    }

    if (request.method === "GET" && url.pathname.startsWith("/get/")) {
      const key = url.pathname.split("/get/")[1];
      if (!key) {
        return new Response("Missing key", { status: 400 });
      }

      const value = await env.mistllc.get(key);
      if (value === null) {
        return new Response(`No value found for key: ${key}`, { status: 404 });
      }

      return new Response(value, { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
};
