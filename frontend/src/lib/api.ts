// frontend/src/lib/api.ts
import type {
  Song,
  Product,
  UserCredentials,
  RegisterPayload,
  Post,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8787";

// Generic GET helper
export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

// -------- Songs --------
export async function fetchSongs(): Promise<Song[]> {
  const res = await fetch(`${API_BASE}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");

  const data = (await res.json()) as Array<Partial<Song>>;

  // Map to full Song type with defaults for missing fields
  return data.map((item) => ({
    id: String(item.id),
    title: item.title || "Unknown Title",
    artist: item.artist || "Unknown Artist",
    album: item.album || "",
    created_at: item.created_at || new Date().toISOString(),
    coverUrl: item.coverUrl || "/placeholder.png",
    audioUrl: item.audioUrl || "/placeholder.mp3", // required
    duration: item.duration || 0,
    releaseDate: item.releaseDate || "",
    genre: item.genre || "",
  }));
}

// -------- Products --------
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (err) {
    console.warn("Products fetch failed, using fallback mock data:", err);
    return [
      {
        id: "1",
        name: "Mist Vinyl",
        price: 29.99,
        imageUrl: "/placeholder.png",
      },
      {
        id: "2",
        name: "Mist Cassette",
        price: 9.99,
        imageUrl: "/placeholder.png",
      },
      {
        id: "3",
        name: "Mist T-Shirt",
        price: 19.99,
        imageUrl: "/placeholder.png",
      },
    ];
  }
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
export async function deletePost(postId: string) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}
// -------- Contact Form --------
export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to submit contact form");
  return res.json();
}
export { Song, Product, UserCredentials, RegisterPayload, Post };
// Re-export types for convenience