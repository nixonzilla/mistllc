import { useEffect, useState } from "react";
import { Song, fetchSongs, addSong, updateSong, deleteSong } from "./api";
import "./App.css";

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch songs on load
  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const data = await fetchSongs();
      setSongs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const songToUpdate = songs.find((s) => s.id === editingId);
        if (songToUpdate) {
          await updateSong(editingId, { title, artist }, songToUpdate);
        }
      } else {
        await addSong({ title, artist });
      }
      setTitle("");
      setArtist("");
      setEditingId(null);
      loadSongs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (song: Song) => {
    setTitle(song.title);
    setArtist(song.artist);
    setEditingId(song.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSong(id);
      loadSongs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <h1>MISTLLC Songs</h1>
      <form onSubmit={handleSubmit} className="song-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Song</button>
      </form>

      <ul className="song-list">
        {songs.map((song) => (
          <li key={song.id}>
            <span>
              "{song.title}" by {song.artist}
            </span>
            <div className="actions">
              <button onClick={() => handleEdit(song)}>Edit</button>
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
