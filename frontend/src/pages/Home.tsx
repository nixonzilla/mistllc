import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";

export default function Home() {
  const { user } = useGlobalContext();

  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-extrabold mb-6">
        Welcome to <span className="text-mist-gold">MISTLLC</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Your hub for music, community, and exclusive merch.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/shop"
          className="px-6 py-3 rounded-lg bg-mist-gold text-black font-semibold hover:bg-yellow-400"
        >
          Visit Shop
        </Link>
        <Link
          to="/community"
          className="px-6 py-3 rounded-lg bg-mist-pink text-white font-semibold hover:bg-pink-500"
        >
          Join Community
        </Link>
      </div>

      {user && (
        <p className="mt-6 text-gray-500">
          Logged in as <span className="font-semibold">{user.id}</span>
        </p>
      )}
    </div>
  );
}
