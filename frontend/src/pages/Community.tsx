// frontend/src/pages/Community.tsx
import { Link } from "react-router-dom";

function Community() {
  return (
    <div className="px-6 py-16 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-primary dark:text-white mb-4">
          Join the Community
        </h1>
        <p className="text-lg text-secondary dark:text-gray-300 max-w-2xl mx-auto">
          MISTLLC is more than just music — it’s about connection, feedback, and growth.  
          Engage with artists, share your thoughts, and be part of something bigger.
        </p>
      </header>

      {/* CTA Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-accent to-purple-600 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Share Your Feedback</h2>
          <p className="mb-4 text-white/90">
            Comment on new releases, support your favorite tracks, and help shape the sound of tomorrow.
          </p>
          <Link
            to="/releases"
            className="px-6 py-3 rounded-xl bg-white text-accent font-semibold hover:opacity-90 transition"
          >
            Explore Releases
          </Link>
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-gray-900/50 shadow-lg border border-gray-200/10 dark:border-gray-700/10">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">
            Connect With Fans
          </h2>
          <p className="mb-4 text-secondary dark:text-gray-300">
            Meet like-minded listeners and artists. Whether you’re here to listen, create, or both — there’s space for you.
          </p>
          <Link
            to="/auth"
            className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Community;
