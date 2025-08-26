// GET /api/hello
export async function onRequestGet() {
  return new Response(
    JSON.stringify({ ok: true, message: "Hello from Pages Functions" }),
    { headers: { "Content-Type": "application/json" } }
  );
}