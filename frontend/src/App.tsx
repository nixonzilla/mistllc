import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";

import Navbar from "./components/layout/NavBar";
import CartOverlay from "./components/layout/CartOverlay";
import Player from "./components/Player";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Community from "./pages/Community";
import PlayerPage from "./pages/Player";

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <CartOverlay />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/community" element={<Community />} />
              <Route path="/player" element={<PlayerPage />} />
            </Routes>
          </main>

          <Player />
        </div>
      </Router>
    </GlobalProvider>
  );
}
