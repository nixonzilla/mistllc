import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiGet } from "../lib/api"

interface Song {
  id: string
  title: string
  artist: string
  url: string
}

export default function Player() {
  const { id } = useParams<{ id: string }>()
  const [song, setSong] = useState<Song | null>(null)

  useEffect(() => {
    async function fetchSong() {
      if (!id) return
      try {
        const data = await apiGet<Song>(`/songs/${id}`)
        setSong(data)
      } catch (err) {
        console.error("Failed to fetch song:", err)
      }
    }
    fetchSong()
  }, [id])

  if (!song) return <p className="text-center mt-10">Loading song...</p>

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold">{song.title}</h1>
      <p className="text-gray-600 mb-4">By {song.artist}</p>
      <audio controls src={song.url} className="w-full rounded-lg shadow" />
    </div>
  )
}
