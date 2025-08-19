import { Router } from "itty-router";

const router = Router();

router.get("/api/hello", () => {
  return new Response(JSON.stringify({ message: "Hello from Node-compatible Worker 🌍" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

export default {
  async fetch(request: Request, env: "mistllc", ctx: "ExecutionContext") {
    return router.handle(request, env, ctx);
  },
};
