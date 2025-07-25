import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>MISTLLC</h1>
        <p>Sound, Code, and Creative Projects</p>
      </header>

      <main className="app-main">
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

      <footer className="app-footer">
        &copy; {new Date().getFullYear()} MISTLLC. All rights reserved.
      </footer>
    </div>
  );
};

export default App;