// frontend/src/components/Layout.tsx
import { ReactNode } from "react";
import Header from "../ui/header";
import Footer from "../ui/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      {/* Sticky Glassy Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12 relative z-10">
        {children}
      </main>

      {/* Glassy Footer */}
      <Footer />

      {/* Subtle Gradient Overlay for extra depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/30"></div>
    </div>
  );
}
