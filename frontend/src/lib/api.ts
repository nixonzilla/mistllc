// frontend/src/lib/api.ts

// Pick up from .env, fallback to local dev port
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787/api/*";

export async function fetchSongs() {
  const res = await fetch(`${API_URL}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}
