// frontend/src/api/songs.ts
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8787";
export type Song = {
  coverUrl: unknown;
  releaseDate: unknown;
  audioUrl: string | undefined;
  id: number;
  title: string;
  artist: string;
  url?: string;
  created_at?: string;
};

export async function fetchSongs(): Promise<Song[]> {
  const res = await fetch(`${API_URL}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

export async function addSong(song: Omit<Song, "id">): Promise<Song> {
  const res = await fetch(`${API_URL}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error("Failed to add song");
  return res.json();
}

export async function updateSong(
  id: number,
  song: Partial<Omit<Song, "id">>
): Promise<Song> {
  const res = await fetch(`${API_URL}/songs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error("Failed to update song");
  return res.json();
}

export async function deleteSong(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`${API_URL}/songs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete song");
  return res.json();
}
export default { fetchSongs, addSong, updateSong, deleteSong };
