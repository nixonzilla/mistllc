// frontend/src/components/footer.tsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/10 dark:bg-black/30 border-t border-white/10 shadow-inner">
      <div className="container mx-auto px-6 py-8 text-center md:text-left">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand / Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-white hover:text-purple-400 transition-colors"
          >
            🌙 MISTLLC
          </Link>

          {/* Nav Links */}
          <div className="flex gap-6 text-sm text-gray-300 dark:text-gray-400">
            <Link to="/releases" className="hover:text-purple-400 transition">
              Releases
            </Link>
            <Link to="/community" className="hover:text-purple-400 transition">
              Community
            </Link>
            <Link to="/shop" className="hover:text-purple-400 transition">
              Shop
            </Link>
            <Link to="/about" className="hover:text-purple-400 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-purple-400 transition">
              Contact
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-4 text-2xl">
            <a
  href="https://twitter.com/mistllc"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Twitter"
  className="hover:text-accent transition"
>
  🐦
</a>
<a
  href="https://instagram.com/llc.mist"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="hover:text-accent transition"
>
  📸
</a>
<a
  href="https://youtube.com/mistllc"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="YouTube"
  className="hover:text-accent transition"
>
  ▶️
</a>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Bottom Section */}
        <p className="text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} MISTLLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
