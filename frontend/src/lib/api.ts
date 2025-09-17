// frontend/src/lib/api.ts

import type { ReactNode } from "react";

export type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
  created_at?: string;
};

export type Product = {
  description: ReactNode;
  id: string;
  name: string;
  price: number;
  image: string;
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

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8787";

// -------- Songs --------
export async function fetchSongs(): Promise<Song[]> {
  const res = await fetch(`${API_BASE}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

// -------- Products --------
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
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
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
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
