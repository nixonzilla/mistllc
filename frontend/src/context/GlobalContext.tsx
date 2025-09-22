/* src/context/GlobalContext.tsx */
import { createContext, useState, useCallback, type ReactNode } from "react";
import type {
  GlobalContextType,
  CartItem,
  Notification,
  Song,
  User,
} from "../lib/types";

/**
 * Named export: GlobalContext
 * - intentionally uses `undefined` as the default so the hook can check at runtime
 */
// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // -------------------------
  // Cart
  // -------------------------
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // -------------------------
  // Player / Songs
  // -------------------------
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const playNext = useCallback(() => {
    setQueue((prev) => {
      if (!currentSong) return prev;
      const idx = prev.findIndex((s) => s.id === currentSong.id);
      if (idx >= 0 && idx < prev.length - 1) {
        const next = prev[idx + 1];
        setCurrentSong(next);
      }
      return prev;
    });
  }, [currentSong]);

  const playPrev = useCallback(() => {
    setQueue((prev) => {
      if (!currentSong) return prev;
      const idx = prev.findIndex((s) => s.id === currentSong.id);
      if (idx > 0) {
        const prevSong = prev[idx - 1];
        setCurrentSong(prevSong);
      }
      return prev;
    });
  }, [currentSong]);

  // -------------------------
  // Auth
  // -------------------------
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  // -------------------------
  // Theme
  // -------------------------
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // -------------------------
  // Notifications
  // -------------------------
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"] = "info") => {
      const id = Date.now().toString();
      const n: Notification = { id, message, type };
      setNotifications((prev) => [...prev, n]);

      // auto-remove after 5s
      setTimeout(() => {
        setNotifications((prev) => prev.filter((x) => x.id !== id));
      }, 5000);
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: Notification["type"] = "info") => {
      addNotification(message, type);
    },
    [addNotification]
  );

  // -------------------------
  // Build the context value (fully typed)
  // -------------------------
  const ctxValue: GlobalContextType = {
    // Cart
    cartOpen,
    setCartOpen,
    cart,
    addToCart,
    removeFromCart,

    // Player
    queue,
    setQueue,
    currentSong,
    setCurrentSong,
    playNext,
    playPrev,

    // Auth
    user,
    setUser,
    token,
    setToken,

    // Theme
    theme,
    setTheme,

    // Notifications
    notifications,
    addNotification,
    removeNotification,
    notify,
  };

  return (
    <GlobalContext.Provider value={ctxValue}>{children}</GlobalContext.Provider>
  );
};
export default GlobalContext;
