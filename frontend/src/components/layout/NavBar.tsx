import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
      <div className="container-narrow py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="inline-block h-9 w-9 rounded-xl bg-brand-500" />
          <span className="text-xl font-extrabold">MISTLLC</span>
        </NavLink>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink className={({isActive}) => isActive ? "text-brand-400" : "text-gray-200 hover:text-white"} to="/songs">Songs</NavLink>
          <NavLink className={({isActive}) => isActive ? "text-brand-400" : "text-gray-200 hover:text-white"} to="/community">Community</NavLink>
          <NavLink className={({isActive}) => isActive ? "text-brand-400" : "text-gray-200 hover:text-white"} to="/shop">Shop</NavLink>
          <NavLink className="btn btn-primary" to="/auth">Sign In</NavLink>
        </nav>
      </div>
    </header>
  );
}
