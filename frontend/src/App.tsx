import { Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import AboutPage from "./pages/AboutPage.tsx"
import NotFound from "./pages/NotFound.tsx"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">MISTLLC</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </nav>
      </header>
      
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
