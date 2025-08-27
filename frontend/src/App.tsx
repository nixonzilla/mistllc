import { useEffect, useState } from "react"

type Song = {
  id: number
  title: string
  artist: string
}

function App() {
  const [backendMessage, setBackendMessage] = useState("Loading...")
  const [songs, setSongs] = useState<Song[]>([])
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")

  useEffect(() => {
    // Check backend health
    fetch("/api/health")
      .then((res) => res.text())
      .then((msg) => setBackendMessage(msg))
      .catch(() => setBackendMessage("⚠️ Failed to reach backend"))

    // Fetch songs
    loadSongs()
  }, [])

  const loadSongs = () => {
    fetch("/api/songs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch songs")
        return res.json()
      })
      .then((data) => setSongs(data))
      .catch((err) => setError(err.message))
  }

  const addSong = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !artist) return

    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, artist }),
      })
      if (!res.ok) throw new Error("Failed to add song")
      setTitle("")
      setArtist("")
      loadSongs()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <h1 className="text-5xl font-bold mb-4 text-yellow-400">MISTLLC 🎵</h1>
      <p className="mb-8 italic text-gray-300">Classic Full Stack App</p>

      {/* Backend Status */}
      <div className="bg-gray-900 border border-yellow-500 p-4 rounded-xl shadow-lg mb-6 w-full max-w-xl text-center">
        <p className="text-lg font-semibold">Backend says:</p>
        <p className="mt-2 text-xl text-yellow-400">{backendMessage}</p>
      </div>

      {/* Song Form */}
      <form
        onSubmit={addSong}
        className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg mb-6 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-4">➕ Add a New Song</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-md bg-black border border-gray-600 text-white focus:border-yellow-400 outline-none"
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="p-2 rounded-md bg-black border border-gray-600 text-white focus:border-yellow-400 outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-md"
          >
            Add Song
          </button>
        </div>
      </form>

      {/* Song List */}
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">🎶 Songs</h2>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        {songs.length === 0 ? (
          <p className="text-gray-400">No songs yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {songs.map((song) => (
              <li
                key={song.id}
                className="flex justify-between bg-black/60 p-3 rounded-md border border-gray-700"
              >
                <span className="font-semibold text-yellow-400">
                  {song.title}
                </span>
                <span className="italic text-gray-300">{song.artist}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
