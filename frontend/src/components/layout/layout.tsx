// src/components/layout/Layout.tsx
import React from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white font-sans">
      {/* Navbar */}
      <header className="bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-md">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="text-2xl font-bold">
            MISTLLC
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/community" className="hover:text-blue-400 transition">
              Community
            </Link>
            <Link to="/shop" className="hover:text-blue-400 transition">
              Shop
            </Link>
          </div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 bg-opacity-90 backdrop-blur-sm mt-12 py-6 text-center text-gray-400 text-sm">
        © 2025 MISTLLC. All rights reserved. <br />
        <Link to="/privacy" className="hover:text-white mx-2">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-white mx-2">
          Terms
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
