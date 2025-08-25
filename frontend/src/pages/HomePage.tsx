import { useEffect } from "react"
import  useApiStore  from "../store/useApiStore"
import { motion } from "framer-motion"

export default function HomePage() {
  const { message, loading, error, fetchMessage } = useApiStore()

  useEffect(() => {
    fetchMessage()
  }, [fetchMessage])

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-brand">Welcome to MISTLLC</h2>
      <p className="mt-2 text-gray-600">Your music, your vibe.</p>

      <div className="mt-6">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {message && <p className="text-green-600 font-medium">{message}</p>}
      </div>
    </motion.div>
  )
}
