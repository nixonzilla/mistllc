import { useEffect, useState } from "react"

type Song = {
  id: number
  title: string
  artist: string
  album?: string
}

export default function App() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/songs`)
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        const data = await res.json()
        setSongs(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  if (loading) return <p className="p-4 text-gray-600">Loading songs...</p>
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎶 MISTLLC Songs</h1>
      {songs.length === 0 ? (
        <p className="text-gray-500">No songs found in database.</p>
      ) : (
        <ul className="space-y-2">
          {songs.map((song) => (
            <li key={song.id} className="p-3 bg-gray-100 rounded-lg shadow">
              <p className="font-semibold">{song.title}</p>
              <p className="text-sm text-gray-600">{song.artist}</p>
              {song.album && <p className="text-xs text-gray-500">Album: {song.album}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
