// frontend/src/pages/Player.tsx
import { useEffect, useState } from "react";
import { fetchSongs, type Song } from "../lib/api";

export default function Player() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    fetchSongs().then(setSongs).catch(console.error);
  }, []);

  if (!songs.length) return <p>Loading songs...</p>;

  const currentSong = songs[current];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{currentSong.title}</h2>
      <p className="text-gray-500">by {currentSong.artist}</p>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % songs.length)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
}
// This is a simple music player component that fetches songs from an API and allows the user to play them.
