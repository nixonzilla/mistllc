// frontend/src/components/header.tsx
import { Link } from "react-router-dom";
import { Theme } from "../../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = Theme();

  return (
    <nav className="backdrop-blur-md bg-white/10 dark:bg-black/30 sticky top-0 z-50 border-b border-white/10 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-white">
          🌙 MISTLLC
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link
            to="/releases"
            className="hover:text-purple-400 transition-colors duration-200"
          >
            Releases
          </Link>
          <Link
            to="/community"
            className="hover:text-purple-400 transition-colors duration-200"
          >
            Community
          </Link>
          <Link
            to="/shop"
            className="hover:text-purple-400 transition-colors duration-200"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="hover:text-purple-400 transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* Right Side: Theme Toggle */}
       <button
  type="button"
  onClick={toggleTheme}
  aria-label="Toggle theme"
  className="ml-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 transition-colors duration-200"
>
  {theme === "light" ? "🌙" : "☀️"}
</button>
    </div>
    </nav>
  );
}