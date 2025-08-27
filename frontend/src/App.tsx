import React, { useEffect, useState } from "react";
import { fetchSongs, createSong } from "./api";
import { SongRow } from "../../shared/types";

const App: React.FC = () => {
  const [songs, setSongs] = useState<SongRow[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    setLoading(true);
    try {
      const data = await fetchSongs();
      setSongs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSong = await createSong({ title, artist });
      setSongs((prev) => [...prev, newSong]);
      setTitle("");
      setArtist("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MISTLLC Music Library</h1>
      <form onSubmit={handleAddSong} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add Song</button>
      </form>

      {loading && <p>Loading songs...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <strong>{song.title}</strong> by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
