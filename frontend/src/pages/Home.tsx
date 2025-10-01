// frontend/src/pages/Home.tsx
function Home() {
  return (
    <main className="flex-1 px-6 py-12 text-center">
      {/* Hero Section */}
      <section className="mb-16">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-300 dark:via-pink-400 dark:to-red-400 mb-6">
          Welcome to MISTLLC
        </h2>
        <p className="text-lg text-secondary dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A hub for authentic music, community vibes, and creative expression.
          Explore our latest releases, connect with like-minded listeners, and
          shop exclusive merch.
        </p>
        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <a
            href="/releases"
            className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition transform"
          >
            Explore Releases
          </a>
          <a
            href="/community"
            className="px-6 py-3 rounded-xl border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition"
          >
            Join Community
          </a>
        </div>
      </section>

      {/* Featured Songs Section */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-primary dark:text-white mb-8">
          Featured Songs
        </h3>
        <p className="text-secondary dark:text-gray-300">
          🎶 Songs will load here…
        </p>
      </section>

      {/* Community CTA */}
      <section className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl py-12 px-6 shadow-lg">
        <h3 className="text-3xl font-bold text-primary dark:text-white mb-4">
          Be Part of Our Creative Community
        </h3>
        <p className="text-secondary dark:text-gray-300 mb-6">
          Share feedback, discover new sounds, and grow with like-minded
          listeners & creators.
        </p>
        <a
          href="/community"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
        >
          Join Now
        </a>
      </section>
    </main>
  );
}

export default Home;
