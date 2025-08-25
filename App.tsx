import React from "react";
import "./App.css";

const latestReleases = [
  {
    id: 1,
    title: "Echoes of Reality",
    artist: "MIST Beats",
    cover:
      "https://via.placeholder.com/150/0f172a/38bdf8?text=Echoes+of+Reality",
    link: "#",
  },
  {
    id: 2,
    title: "Nightfall Vibes",
    artist: "MIST Collective",
    cover:
      "https://via.placeholder.com/150/0f172a/38bdf8?text=Nightfall+Vibes",
    link: "#",
  },
  {
    id: 3,
    title: "Raw Energy",
    artist: "MIST Sounds",
    cover: "https://via.placeholder.com/150/0f172a/38bdf8?text=Raw+Energy",
    link: "#",
  },
  {
    id: 4,
    title: "Digital Waves",
    artist: "MIST Audio",
    cover: "https://via.placeholder.com/150/0f172a/38bdf8?text=Digital+Waves",
    link: "#",
  },
];

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="logo">
          MIST<span>LLC</span>
        </h1>
        <nav>
          <a href="#music">Music</a>
          <a href="#community">Community</a>
          <a href="#shop">Shop</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Authentic Music. Real Connection.</h2>
        <p>
          Welcome to MISTLLC — a home for emotionally resonant sound, authentic
          artistry, and community-driven creativity.
        </p>
        <button className="cta-button">Explore Music</button>
      </section>

      {/* Latest Releases Grid */}
      <section className="latest-releases" id="music">
        <h3>Latest Releases</h3>
        <div className="releases-grid">
          {latestReleases.map(({ id, title, artist, cover, link }) => (
            <a key={id} href={link} className="release-card" target="_blank" rel="noreferrer">
              <img src={cover} alt={`${title} cover`} />
              <div className="release-info">
                <h4>{title}</h4>
                <p>{artist}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} MISTLLC. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
