import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-light dark:bg-gradient-dark transition-colors duration-700">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <h1 className="text-2xl font-extrabold text-primary dark:text-white">
          MISTLLC
        </h1>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {["Home", "Releases", "Community", "Shop"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-secondary dark:text-gray-300 hover:text-accent transition"
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-full p-2 bg-accent text-white hover:opacity-90 transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 text-center">
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
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-center text-sm text-secondary dark:text-gray-400">
        © {new Date().getFullYear()} MISTLLC. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
