// frontend/src/main.tsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/layout";

// Pages
import Home from "./pages/Home";
import Releases from "./pages/Releases";
import Community from "./pages/Community";
import Shop from "./pages/Shop";
import PlayerPage from "./pages/Player";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-2xl">Loading…</div>
    </div>
  );
}

function MainApp() {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/releases" element={<Releases />} />
                <Route path="/community" element={<Community />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/player" element={<PlayerPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
}

// ✅ Mount only once
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

export default MainApp;
