// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Header  from "./components/ui/header";
import Footer from "./components/ui/Footer";
import Home from "./pages/Home";
import Releases from "./pages/Releases";
import Community from "./pages/Community";
import Shop from "./pages/Shop";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-700 via-black to-gray-900 text-white font-sans">
        {/* Site Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 px-6 md:px-12 lg:px-24 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/community" element={<Community />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
