import React, { useEffect, useState } from "react";

type Song = {
  id: number;
  title: string;
  artist?: string;
  created_at?: string;
};

export default function SongsList() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`);
        if (!res.ok) throw new Error("Failed to fetch songs");
        const data = await res.json();
        setSongs(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch songs");
      }
    };
    fetchSongs();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (songs.length === 0) return <p>No songs yet</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Songs</h2>
      <ul className="space-y-2">
        {songs.map((s) => (
          <li
            key={s.id}
            className="p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
          >
            <p className="font-semibold">{s.title}</p>
            {s.artist && <p className="text-sm text-gray-600">{s.artist}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
