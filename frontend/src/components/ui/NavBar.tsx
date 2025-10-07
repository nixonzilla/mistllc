import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MIST<span className="text-gray-800">LLC</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-blue-600">
              Community
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-blue-600">
              Shop
            </Link>
          </nav>

          {/* CTA button */}
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
