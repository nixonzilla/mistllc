export interface Song {
  id: string;
  title: string;
  artist: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function getSongs(): Promise<Song[]> {
  const res = await fetch(`${API_BASE}/songs`);
  if (!res.ok) {
    throw new Error(`Failed to fetch songs: ${res.statusText}`);
  }
  return res.json();
}

export async function addSong(song: Omit<Song, "id">): Promise<Song> {
  const res = await fetch(`${API_BASE}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });

  if (!res.ok) {
    throw new Error(`Failed to add song: ${res.statusText}`);
  }
  return res.json();
}
