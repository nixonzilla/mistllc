import { ExoticComponent } from "react";

export default {
  async fetch(request: Request, _env: AnimationPlaybackEvent, _ctx: ExoticComponent): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/hello") {
      return new Response(JSON.stringify({ message: "Hello from Worker-style backend 🚀" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
