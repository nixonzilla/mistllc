// frontend/src/main.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./index.css";

// Components
import Footer from "./components/ui/Footer";

// Pages
import Home from "./pages/Home";
import Releases from "./pages/Releases";
import Community from "./pages/Community";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Songs from "./pages/Songs";
import Player from "./pages/Player";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function Main() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md shadow-lg">
          <h1 className="text-2xl font-extrabold tracking-wide">🌙 MISTLLC</h1>

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

          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="ml-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 transition-colors duration-200"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/community" element={<Community />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/player" element={<Player />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Sticky Footer */}
        <Footer />
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found in index.html");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
export default Main;