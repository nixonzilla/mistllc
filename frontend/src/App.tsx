// frontend/src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/layout";
import SongsPage from "./pages/Songs";
import ShopPage from "./pages/Shop";
import CommunityPage from "./pages/Community";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/songs" replace />} />
        <Route path="songs" element={<SongsPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="community" element={<CommunityPage />} />
      </Route>
    </Routes>
  );
}

export default App;
