// frontend/src/components/Header.tsx
import { NavLink } from "react-router-dom";
import { Theme } from "../../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = Theme();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md shadow-lg">
      {/* Logo / Brand */}
      <h1 className="text-2xl font-extrabold tracking-wide text-purple-300">
        🌙 MISTLLC
      </h1>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-6 text-sm font-semibold">
        {["Home", "Releases", "Community", "Shop", "About", "Contact"].map(
          (item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `transition hover:text-purple-400 ${
                  isActive ? "text-purple-400" : "text-gray-300"
                }`
              }
            >
              {item}
            </NavLink>
          )
        )}
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        type="button"
        aria-label="Toggle theme"
        className="ml-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 transition-colors duration-200"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
