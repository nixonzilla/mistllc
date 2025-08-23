import { useState, useEffect } from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/songs");
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

  // Apply search + sort
  const filteredSongs = songs
    .filter(
      (song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sort === "artist") {
        return order === "asc"
          ? a.artist.localeCompare(b.artist)
          : b.artist.localeCompare(a.artist);
      }
      return order === "asc" ? a.id - b.id : b.id - a.id; // fallback
    });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🎵 MISTLLC Dashboard
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="createdAt">Newest</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Loading/Error states */}
      {loading && <p className="text-gray-600">Loading songs...</p>}
      {error && <p className="text-red-500">⚠️ {error}</p>}

      {/* Song Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {song.title}
              </h2>
              <p className="text-gray-500">{song.artist}</p>
              <p className="text-gray-400 text-sm mt-1">⏱ {song.duration}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Edit
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
