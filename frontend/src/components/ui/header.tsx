interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <h1 className="text-2xl font-bold">MISTLLC</h1>

      <nav className="hidden md:flex gap-6 font-medium">
        <a href="#releases" className="hover:text-blue-500">Releases</a>
        <a href="#community" className="hover:text-blue-500">Community</a>
        <a href="#merch" className="hover:text-blue-500">Merch</a>
      </nav>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:opacity-80"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
