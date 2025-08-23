// frontend/src/api.ts

export interface Song {
  id: number;
  title: string;
  artiste: string;
  created_at: string;
}

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8787"; // fallback to local wrangler dev

export async function getSongs(): Promise<Song[]> {
  const res = await fetch(`${API_BASE}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

export async function createSong(title: string, artiste: string): Promise<void> {
  const res = await fetch(`${API_BASE}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, artiste }),
  });
  if (!res.ok) throw new Error("Failed to create song");
}

export async function updateSong(id: number, title?: string, artiste?: string): Promise<void> {
  const res = await fetch(`${API_BASE}/songs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, artiste }),
  });
  if (!res.ok) throw new Error("Failed to update song");
}

export async function deleteSong(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/songs/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete song");
}
