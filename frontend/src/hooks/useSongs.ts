// frontend/src/hooks/useSongs.ts
import { useState, useEffect } from "react";

export interface Song {
  id: number;
  title: string;
  artist: string;
}

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSongs() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/songs");
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data: Song[] = await res.json();
        setSongs(data);
      } catch (err: any) {
        setError(err.message || "Error fetching songs");
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  async function addSong(title: string, artist: string) {
    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, artist }),
      });

      if (!res.ok) throw new Error(`Failed to add song: ${res.status}`);

      const newSongs = [...songs, { id: Date.now(), title, artist }];
      setSongs(newSongs);
    } catch (err: any) {
      setError(err.message || "Error adding song");
    }
  }

  return { songs, loading, error, addSong };
}
