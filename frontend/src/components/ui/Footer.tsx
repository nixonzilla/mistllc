export default function Footer() {
  return (
    <footer className="px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-center text-sm text-secondary dark:text-gray-400">
      <p>© {new Date().getFullYear()} MISTLLC. All rights reserved.</p>
      <div className="mt-2 flex justify-center gap-4 text-lg">
        <a href="#" className="hover:text-accent">
          🐦
        </a>
        <a href="#" className="hover:text-accent">
          📸
        </a>
        <a href="#" className="hover:text-accent">
          🎵
        </a>
      </div>
    </footer>
  );
}
