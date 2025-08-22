import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SongsPage from "./pages/SongsPage"

export default function App() {
  return (
    <Router>
      <nav className="p-4 flex gap-4 bg-gray-900 text-white">
        <Link to="/">Home</Link>
        <Link to="/songs">Songs</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/songs" element={<SongsPage />} />
        </Routes>
      </div>
    </Router>
  )
}
