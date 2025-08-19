export default {
  async fetch(request: Request,  env = "mistllc", ctx = "ExecutionContext"): Promise<Response> {
    if (request.method === "GET" && new URL(request.url).pathname === "/api/hello") {
      return new Response(JSON.stringify({ message: "Hello from Worker-style backend 🚀" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
