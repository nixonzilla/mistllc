export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    // Example routes
    if (pathname === "/") {
      return new Response("🚀 MISTLLC Backend is running!", {
        headers: { "content-type": "text/plain" },
      });
    }

    if (pathname === "/api/hello") {
      return new Response(
        JSON.stringify({ message: "Hello from MISTLLC API!" }),
        { headers: { "content-type": "application/json" } }
      );
    }

    // Example using D1 binding (database)
    if (pathname === "/api/db-test") {
      try {
        const { results } = await env.DB.prepare("SELECT datetime('now') as now;").all();
        return new Response(JSON.stringify(results), {
          headers: { "content-type": "application/json" },
        });
      } catch (err) {
        return new Response("DB error: " + err.message, { status: 500 });
      }
    }

    return new Response("404 Not Found", { status: 404 });
  },
};
