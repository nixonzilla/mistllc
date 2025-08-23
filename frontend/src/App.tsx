import { useEffect, useState } from "react";
import { getSongs, createSong, deleteSong, } from "./lib/api.ts";
import type { Song } from "./lib/api.ts";

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [artiste, setArtiste] = useState("");

  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    try {
      setLoading(true);
      const data = await getSongs();
      setSongs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddSong(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createSong(title, artiste);
      setTitle("");
      setArtiste("");
      await loadSongs();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteSong(id);
      await loadSongs();
    } catch (err: any) {
      setError(err.message);
    }
  }

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artiste.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">🎵 MISTLLC Dashboard</h1>

        {/* Add Song Form */}
        <form
          onSubmit={handleAddSong}
          className="flex gap-2 mb-6 bg-white shadow-md rounded-2xl p-4"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song title"
            className="flex-1 border rounded-xl p-2"
          />
          <input
            type="text"
            value={artiste}
            onChange={(e) => setArtiste(e.target.value)}
            placeholder="Artiste"
            className="flex-1 border rounded-xl p-2"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Add
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search songs..."
          className="w-full mb-4 border rounded-xl p-2"
        />

        {/* Songs List */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid gap-4">
            {filtered.map((song) => (
              <div
                key={song.id}
                className="flex justify-between items-center bg-white shadow rounded-2xl p-4 hover:shadow-lg transition"
              >
                <div>
                  <h2 className="text-lg font-semibold">{song.title}</h2>
                  <p className="text-gray-500">by {song.artiste}</p>
                </div>
                <button
                  onClick={() => handleDelete(song.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
