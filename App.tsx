import React from "react";

const App: React.FC = () => {
  return (
    <div style={{ background: "#0e0e0e", color: "#f0f0f0", minHeight: "100vh", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
      <header style={{ padding: "2rem 0", textAlign: "center" }}>
        <h1>MISTLLC</h1>
        <p>Sound, Code, and Creative Projects</p>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
        <section>
          <h2>🎵 Audio Releases</h2>
          <ul>
            <li>Latest singles and albums (coming soon)</li>
          </ul>
        </section>

        <section>
          <h2>🛒 Merchandise</h2>
          <ul>
            <li>Exclusive MISTLLC apparel and art (coming soon)</li>
          </ul>
        </section>

        <section>
          <h2>🤝 Community</h2>
          <ul>
            <li>Fan forums, events, and more (coming soon)</li>
          </ul>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "1rem 0", opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} MISTLLC. All rights reserved.
      </footer>
    </div>
  );
};