// frontend/src/hooks/useSongs.ts
import { useEffect, useState } from "react";

export interface Song {
  id: number;
  title: string;
  artist: string;
}

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch songs
  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/songs");
      if (!res.ok) throw new Error("Failed to fetch songs");

      const data = await res.json();
      setSongs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // add song
  const addSong = async (title: string, artist: string) => {
    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, artist }),
      });

      if (!res.ok) throw new Error("Failed to add song");

      await fetchSongs(); // refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return { songs, loading, error, fetchSongs, addSong };
}
