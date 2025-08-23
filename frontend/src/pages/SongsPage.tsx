import { useEffect } from "react"
import { Card, CardContent } from "../components/ui/card"
import { motion } from "framer-motion"
import { useSongsStore } from "../store/useSongsStore"

export default function SongsPage() {
  const { songs, loading, error, fetchSongs } = useSongsStore()

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  return (
    <motion.div
      className="max-w-3xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-brand mb-6">🎵 Songs</h2>

      {loading && <p className="text-gray-500">Loading songs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid gap-4">
        {songs.map((song) => (
          <Card
            key={song.id}
            className="shadow-lg rounded-2xl hover:shadow-xl transition"
          >
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="text-xl font-semibold">{song.title}</h3>
                <p className="text-gray-600">{song.artist}</p>
              </div>
              <span className="text-sm text-gray-500">{song.duration}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
