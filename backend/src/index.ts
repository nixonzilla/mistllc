import { KVNamespace, ExecutionContext } from "@cloudflare/workers-types";

export interface Env {
  mistllc: KVNamespace;
  DATABASE_URL?: string;
  API_KEY?: string;
  SECRET_KEY?: string;
}

const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // API routes
    if (url.pathname.startsWith('/api')) {
      const path = url.pathname.replace('/api', '');
      if (path === '/get') {
        const value = await env.mistllc.get('example-key');
        return jsonResponse({ value });
      }
      if (path === '/set' && request.method === 'POST') {
        const body = await request.json();
        await env.mistllc.put('example-key', body.value);
        return jsonResponse({ success: true });
      }
      return jsonResponse({ error: 'API endpoint not found' }, 404);
    }

    // Serve frontend files from KV
    const assetUrl = url.pathname === '/' ? '/index.html' : url.pathname;
    const asset = await env.mistllc.get(assetUrl);
    if (asset) {
      const headers = new Headers();
      if (assetUrl.endsWith('.js')) headers.set('Content-Type', 'application/javascript');
      if (assetUrl.endsWith('.css')) headers.set('Content-Type', 'text/css');
      if (assetUrl.endsWith('.html')) headers.set('Content-Type', 'text/html');
      return new Response(asset, { headers });
    }

    // Fallback to index.html for SPA
    const index = await env.mistllc.get('/index.html');
    return new Response(index, { headers: { 'Content-Type': 'text/html' } });
  },
};
