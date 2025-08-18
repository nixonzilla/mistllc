export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/hello") {
      return Response.json({ message: "Hello from Worker backend!" });
    }

    return new Response("Not found", { status: 404 });
  },
};
