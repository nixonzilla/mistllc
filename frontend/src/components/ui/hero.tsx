import { SITE } from "../../constants";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-600 to-red-500 opacity-70 mix-blend-overlay" />
      
      {/* Animated background blur effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/40 via-transparent to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">{SITE.name}</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          {SITE.tagline}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/releases"
            className="px-6 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Explore Releases
          </Link>
          <Link
            to="/community"
            className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Join Community
          </Link>
        </div>
      </div>
    </section>
  );
}
