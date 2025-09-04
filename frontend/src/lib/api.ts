// src/lib/api.ts
const API_BASE = "http://localhost:8787" // adjust if backend runs on different port

// GET request
export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`GET ${endpoint} failed: ${res.status}`);
  }

  return res.json();
}

// POST request
export async function apiPost<T>(endpoint: string, body: any): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`POST ${endpoint} failed: ${res.status}`);
  }

  return res.json();
}
