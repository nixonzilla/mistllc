// frontend/src/components/layout/Layout.tsx
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-black bg-opacity-40 backdrop-blur-md">
        <h1 className="text-2xl font-bold">🎵 MISTLLC</h1>
        <div className="flex gap-6">
          <Link to="/songs" className="hover:text-purple-400">
            Songs
          </Link>
          <Link to="/shop" className="hover:text-purple-400">
            Shop
          </Link>
          <Link to="/community" className="hover:text-purple-400">
            Community
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500">
        © {new Date().getFullYear()} MISTLLC. All rights reserved.
      </footer>
    </div>
  );
}
