import { SongRow } from "../../shared/types";

export async function fetchSongs(): Promise<SongRow[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

export async function createSong(song: { title: string; artist: string }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });

  if (!res.ok) throw new Error("Failed to create song");
  return res.json();
}
