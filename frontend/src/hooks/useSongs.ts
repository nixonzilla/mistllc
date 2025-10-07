// frontend/src/hooks/useSongs.ts
import { useEffect, useState } from "react";

export interface Song {
  id: number;
  title: string;
  artist: string;
  created_at: string; // ISO date string
  coverUrl?: string; // optional album art
  audioUrl?: string; // optional streaming URL
}

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch songs
  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/songs");
      if (!res.ok) {
        throw new Error(`Failed to fetch songs (status ${res.status})`);
      }

      const data: Song[] = await res.json();
      setSongs(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add new song
  const addSong = async (song: Omit<Song, "id">) => {
    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song),
      });

      if (!res.ok) {
        throw new Error(`Failed to add song (status ${res.status})`);
      }

      await fetchSongs(); // refresh list
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return { songs, loading, error, fetchSongs, addSong };
}
export default useSongs;