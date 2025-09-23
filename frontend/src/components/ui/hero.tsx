export default function Hero() {
  return (
    <section className="flex-1 flex items-center justify-center px-6 py-12 text-center">
      <div>
        <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">
          Welcome to MISTLLC
        </h2>
        <p className="text-lg text-secondary dark:text-gray-300 max-w-xl mx-auto">
          A hub for authentic music, community vibes, and creative expression.
          Explore our latest releases, connect with like-minded listeners, and
          shop exclusive merch.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition">
            Explore Releases
          </button>
          <button className="px-6 py-3 rounded-xl border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition">
            Join Community
          </button>
        </div>
      </div>
    </section>
  );
}
