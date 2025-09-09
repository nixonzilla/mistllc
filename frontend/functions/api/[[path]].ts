export async function onRequest({ request, params }) {
  const path = params.path || "";
  
  // Forward to backend worker
  const backendUrl = `https://mistllc.org/api/${path}`;

  const response = await fetch(backendUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== "GET" ? await request.text() : undefined,
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: response.headers,
  });
}
