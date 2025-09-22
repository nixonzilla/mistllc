// frontend/src/lib/api.ts

export type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
  created_at?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string; // ✅ make it match types.ts (string, not ReactNode)
  imageUrl?: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = UserCredentials & {
  name: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at?: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8787";

// ✅ Generic GET helper (fixes "apiGet not exported" error)
export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

// -------- Songs --------
export async function fetchSongs(): Promise<Song[]> {
  return apiGet<Song[]>("/songs");
}

// -------- Products --------
export async function fetchProducts(): Promise<Product[]> {
  return apiGet<Product[]>("/products");
}

// -------- Auth --------
export async function login(payload: UserCredentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(payload: RegisterPayload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// -------- Community / Posts --------
export async function fetchPosts(): Promise<Post[]> {
  return apiGet<Post[]>("/posts");
}

export async function addPost(post: { title: string; content: string }) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to add post");
  return res.json();
}
