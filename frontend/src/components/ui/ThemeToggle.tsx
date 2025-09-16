import { useGlobalContext } from "../../context/GlobalContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useGlobalContext();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      Theme: {theme}
    </button>
  );
}
