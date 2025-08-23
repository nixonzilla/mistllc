const API_URL = "http://127.0.0.1:8787"; // backend URL

// Fetch all songs
export async function fetchSongs() {
  const res = await fetch(`${API_URL}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

// Add a new song
export async function addSong(song: { title: string; artist: string; duration: string }) {
  const res = await fetch(`${API_URL}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error("Failed to add song");
  return res.json();
}

// Delete a song
export async function deleteSong(id: number) {
  const res = await fetch(`${API_URL}/songs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete song");
  return res.json();
}
// Update a song
export async function updateSong(
  id: number,
  updates: { title: string; artist: string; duration: string }
) {
  const res = await fetch(`${API_URL}/songs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update song");
  return res.json();
}
