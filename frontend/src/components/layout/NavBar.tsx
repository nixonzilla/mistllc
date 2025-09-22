import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const { user, setCartOpen } = useGlobalContext();

  return (
    <nav className="bg-mist-gray shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-mist-gold">
          MISTLLC
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-mist-gold">
            Home
          </Link>
          <Link to="/shop" className="hover:text-mist-gold">
            Shop
          </Link>
          <Link to="/community" className="hover:text-mist-gold">
            Community
          </Link>
          <Link to="/player" className="hover:text-mist-gold">
            Player
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative hover:text-mist-gold"
          >
            🛒
          </button>

          {/* User */}
          {user ? (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user.id}
            </span>
          ) : (
            <Link to="/login" className="hover:text-mist-gold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
