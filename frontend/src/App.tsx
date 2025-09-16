// frontend/src/App.tsx
import { useEffect, useState } from "react";
import { fetchSongs, type Song } from "./lib/api";

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSongs()
      .then(setSongs)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          🎵 MISTLLC Music Library
        </h1>
        <p className="text-gray-400 mt-2">Curated sounds for the community</p>
      </header>

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="h-6 w-3/4 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-700 rounded mt-2"></div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && songs.length === 0 && (
        <p className="text-center text-gray-400">No songs yet. 🎶</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-gray-400">by {song.artist}</p>
            <p className="text-sm text-gray-500 mt-2">
              Added {new Date(song.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
