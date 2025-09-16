import { type ReactNode } from "react";
import Navbar from "./NavBar";
import CartOverlay from "./CartOverlay";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartOverlay />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
