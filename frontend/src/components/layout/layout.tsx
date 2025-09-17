// frontend/src/components/layout/layout.tsx
import type { ReactNode } from "react";
import Navbar from "./NavBar";
import CartOverlay from "./CartOverlay";
import Player from "../Player";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <CartOverlay />

      <main className="flex-1">{children}</main>

      <Player />
    </div>
  );
}
