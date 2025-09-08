import { useEffect, useState } from "react";
import { fetchSongs } from "../lib/api";

export function useFetchSongs() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchSongs();
      setSongs(data);
      setLoading(false);
    }
    load();
  }, []);

  return { songs, loading };
}
