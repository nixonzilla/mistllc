// frontend/src/components/ui/ThemeToggle.tsx
import { useGlobalContext } from "../../context/GlobalContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useGlobalContext();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
};

export default ThemeToggle;
