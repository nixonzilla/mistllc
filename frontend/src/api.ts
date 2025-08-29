const API_URL = import.meta.env.VITE_API_URL;

export type Song = {
  id: number;
  title: string;
  artist: string;
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

export async function updateSong(id: number, song: Partial<Omit<Song, "id">>): Promise<Song> {
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