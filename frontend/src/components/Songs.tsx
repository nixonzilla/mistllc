// frontend/src/components/Songs.tsx
import { useState } from "react";
import { useSongs } from "../hooks/useSongs";

export default function Songs() {
  const { songs, loading, error, addSong } = useSongs();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !artist) return;

    await addSong(title, artist);
    setTitle("");
    setArtist("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">🎵 Songs</h2>

      {loading && <p>Loading songs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mb-4">
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} — <em>{song.artist}</em>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1"
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="border p-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1">
          Add
        </button>
      </form>
    </div>
  );
}
