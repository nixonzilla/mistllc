export interface Env {
  mistllc: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({ ok: true, service: 'worker', time: new Date().toISOString() });
    }

    if (url.pathname === '/api/kv/get' && url.searchParams.has('key')) {
      const key = url.searchParams.get('key')!;
      const value = await env.mistllc.get(key);
      return Response.json({ key, value });
    }

    if (url.pathname === '/api/kv/set' && request.method === 'POST') {
      const { key, value } = await request.json();
      await env.mistllc.put(key, value);
      return Response.json({ ok: true, key });
    }

    return new Response('Not Found', { status: 404 });
  }
};
