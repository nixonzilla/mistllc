import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <h1 className="text-2xl font-extrabold text-primary dark:text-white">
        MISTLLC
      </h1>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a
          href="#"
          className="text-secondary dark:text-gray-300 hover:text-accent"
        >
          Home
        </a>
        <a
          href="#"
          className="text-secondary dark:text-gray-300 hover:text-accent"
        >
          Releases
        </a>
        <a
          href="#"
          className="text-secondary dark:text-gray-300 hover:text-accent"
        >
          Community
        </a>
        <a
          href="#"
          className="text-secondary dark:text-gray-300 hover:text-accent"
        >
          Shop
        </a>
      </nav>

      <ThemeToggle />
    </header>
  );
}
