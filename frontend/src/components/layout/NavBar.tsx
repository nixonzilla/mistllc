import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-900 text-white">
      <NavLink
        to="/"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "font-bold underline" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/songs"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "font-bold underline" : ""
        }
      >
        Songs
      </NavLink>
      <NavLink
        to="/community"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "font-bold underline" : ""
        }
      >
        Community
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "font-bold underline" : ""
        }
      >
        Shop
      </NavLink>
    </nav>
  );
}
