/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

// Generic GET request
export async function apiGet(endpoint: string, token?: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) throw new Error(`GET ${endpoint} failed`);
  return res.json();
}

// Generic POST request
export async function apiPost(endpoint: string, body: any, token?: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || `POST ${endpoint} failed`);
  }
  return res.json();
}

// --- Auth Helpers ---
export async function login(email: string, password: string) {
  return apiPost("/login", { email, password });
}

export async function register(
  email: string,
  _name: string,
  password?: string
) {
  return apiPost("/register", { email, password });
}

// --- Shop Helpers ---
export async function fetchProducts() {
  return apiGet("/products");
}

export async function checkout(cart: any[], token: string) {
  return apiPost("/checkout", { cart }, token);
}

// --- Community Helpers ---
export async function fetchPosts() {
  return apiGet("/posts");
}

export async function addPost(content: string, token: string) {
  return apiPost("/posts", { content }, token);
}
