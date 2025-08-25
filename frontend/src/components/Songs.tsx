import { useState } from "react";
import { useSongs } from "../hooks/useSongs";

export default function Songs() {
  const { songs, loading, addSong, deleteSong } = useSongs();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !artist) return;
    addSong({ title, artist });
    setTitle("");
    setArtist("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">🎵 Songs</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Song
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {songs.map((song) => (
            <li
              key={song.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <span>
                <strong>{song.title}</strong> — {song.artist}
              </span>
              <button
                onClick={() => deleteSong(song.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
