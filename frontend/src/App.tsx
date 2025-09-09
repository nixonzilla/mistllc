import { useEffect, useState } from "react";

type Song = {
  id: number;
  title: string;
  artist: string;
  created_at: string;
};

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/songs`);
        if (!res.ok) throw new Error("Failed to fetch songs");
        const data = await res.json();
        setSongs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          🎵 MISTLLC Music Library
        </h1>
        <p className="text-gray-400 mt-2">Curated Sounds For The Community</p>
      </header>

      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Grid container */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Skeleton cards when loading */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg animate-pulse"
            >
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            </div>
          ))}

        {/* Songs */}
        {!loading &&
          !error &&
          songs.map((song) => (
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

      {/* Empty state */}
      {!loading && !error && songs.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No songs yet. 🎶</p>
      )}
    </div>
  );
}

export default App;
