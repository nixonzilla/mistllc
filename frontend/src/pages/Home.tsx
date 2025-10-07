// frontend/src/pages/Home.tsx
import { Link } from "react-router-dom";
import SongsGrid from "../components/ui/SongsGrid";
import { useSongs } from "../hooks/useSongs";

export default function Home() {
  const { songs, loading, error } = useSongs();

  return (
    <div className="px-6 py-12 text-center">
      {/* Hero Section */}
      <section className="mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-300 drop-shadow mb-4">
          Welcome to MISTLLC 🌙
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A hub for authentic music, community vibes, and creative expression.  
          Explore our latest releases, connect with like-minded listeners, and shop exclusive merch.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/releases"
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:scale-105 hover:bg-purple-700 transition"
          >
            Explore Releases
          </Link>
          <Link
            to="/community"
            className="px-6 py-3 rounded-xl border border-purple-500 text-purple-400 font-semibold hover:bg-purple-600 hover:text-white transition"
          >
            Join Community
          </Link>
        </div>
      </section>

      {/* Featured Songs */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-white mb-6">🎶 Featured Songs</h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <SongsGrid songs={songs} loading={loading} onPlay={function (): void {
              throw new Error("Function not implemented.");
            } } />
        )}
      </section>

      {/* Community Call-to-Action */}
      <section className="bg-black/40 backdrop-blur-md rounded-2xl p-10 max-w-3xl mx-auto shadow-lg">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">
          Be Part of Our Creative Community
        </h3>
        <p className="text-gray-300 mb-6">
          Share feedback, discover new sounds, and grow with like-minded listeners & creators.
        </p>
        <Link
          to="/community"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:scale-105 transition"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
}
