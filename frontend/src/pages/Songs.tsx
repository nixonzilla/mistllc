import { useEffect, useState } from "react"
import { apiGet } from "../lib/api"

interface Song {
  id: string
  title: string
  artist: string
}

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSongs() {
      try {
        const data = await apiGet<Song[]>("/songs")
        setSongs(data)
      } catch (err) {
        console.error("Failed to fetch songs:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  if (loading) return <p className="text-center text-gray-500">Loading...</p>
  if (!songs.length) return <p className="text-center">🎶 No songs available.</p>

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Songs</h1>
      <ul className="space-y-3">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-4 rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200 transition"
          >
            <p className="font-semibold">{song.title}</p>
            <p className="text-sm text-gray-600">{song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
