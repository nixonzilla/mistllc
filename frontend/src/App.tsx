import { useEffect, useState } from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/songs") // ✅ points to backend
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading songs...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎵 MISTLLC Songs</h1>
      <ul className="space-y-2">
        {songs.map((song) => (
          <li key={song.id} className="p-4 border rounded-xl shadow">
            <h2 className="text-lg font-semibold">{song.title}</h2>
            <p className="text-sm text-gray-600">
              {song.artist} — {song.duration}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
