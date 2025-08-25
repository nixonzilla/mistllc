// useSongs.ts
const LOCAL_BASE_URL = "http://127.0.0.1:8787";
const PROD_BASE_URL = "https://mistllc-backend.jacobnixon59.workers.dev";

const BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? LOCAL_BASE_URL
    : PROD_BASE_URL;

export interface Song {
  id?: number;
  title: string;
  artist: string;
  duration: string;
}

// Get all songs
export async function getSongs(): Promise<Song[]> {
  try {
    const res = await fetch(`${BASE_URL}/songs`);
    if (!res.ok) throw new Error("Failed to fetch songs");
    return await res.json();
  } catch (err) {
    console.error("Error fetching songs:", err);
    return [];
  }
}

// Add a new song
export async function addSong(song: Song): Promise<Song | null> {
  try {
    const res = await fetch(`${BASE_URL}/songs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    });
    if (!res.ok) throw new Error("Failed to add song");
    return await res.json();
  } catch (err) {
    console.error("Error adding song:", err);
    return null;
  }
}

// Update a song
export async function updateSong(song: Song): Promise<Song | null> {
  if (!song.id) throw new Error("Song ID required for update");
  try {
    const res = await fetch(`${BASE_URL}/songs/${song.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    });
    if (!res.ok) throw new Error("Failed to update song");
    return await res.json();
  } catch (err) {
    console.error("Error updating song:", err);
    return null;
  }
}

// Delete a song
export async function deleteSong(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/songs/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error("Error deleting song:", err);
    return false;
  }
}
