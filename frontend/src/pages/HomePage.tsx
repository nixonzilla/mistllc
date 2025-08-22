import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-brand">Welcome to MISTLLC</h2>
      <p className="mt-2 text-gray-600">Your music, your vibe.</p>
    </motion.div>
  )
}
