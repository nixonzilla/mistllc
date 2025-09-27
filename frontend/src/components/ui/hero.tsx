export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-16">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
        Welcome to <span className="text-blue-600 dark:text-blue-400">MISTLLC</span>
      </h2>
      <p className="max-w-2xl text-lg opacity-90 leading-relaxed mb-8">
        A hub for authentic music, community vibes, and creative expression.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
          Explore Releases
        </button>
        <button className="px-6 py-3 rounded-lg bg-gray-600 text-white font-semibold shadow hover:bg-gray-700 transition">
          Join Community
        </button>
      </div>
    </section>
  );
}
