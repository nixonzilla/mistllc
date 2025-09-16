/* eslint-disable react-refresh/only-export-components */
// frontend/src/context/GlobalContext.tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Song, Product } from "../../lib/api";

// --- Types ---
export type User = {
  id: string;
  name: string;
  email: string;
} | null;

export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export type CartItem = Product & { quantity: number };

export type GlobalContextType = {
  // Cart overlay toggle
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;

  // Cart items + helpers
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;

  // Player
  queue: Song[];
  setQueue: Dispatch<SetStateAction<Song[]>>;
  currentSong: Song | null;
  setCurrentSong: Dispatch<SetStateAction<Song | null>>;
  playNext: () => void;
  playPrev: () => void;

  // User + auth
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;

  // Theme
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;

  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;
  notify: (message: string, type?: Notification["type"]) => void;
};

// --- Context ---
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Cart toggle
  const [cartOpen, setCartOpen] = useState(false);

  // Cart items
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Player
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const playNext = () => {
    if (!currentSong) return;
    const idx = queue.findIndex((s) => s.id === currentSong.id);
    if (idx >= 0 && idx < queue.length - 1) setCurrentSong(queue[idx + 1]);
  };
  const playPrev = () => {
    if (!currentSong) return;
    const idx = queue.findIndex((s) => s.id === currentSong.id);
    if (idx > 0) setCurrentSong(queue[idx - 1]);
  };

  // User + auth
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  // Theme
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = (
    message: string,
    type: Notification["type"] = "info"
  ) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
  const notify = (message: string, type: Notification["type"] = "info") =>
    addNotification(message, type);

  return (
    <GlobalContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        cart,
        addToCart,
        removeFromCart,
        queue,
        setQueue,
        currentSong,
        setCurrentSong,
        playNext,
        playPrev,
        user,
        setUser,
        token,
        setToken,
        theme,
        setTheme,
        notifications,
        addNotification,
        removeNotification,
        notify,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// --- Hook ---
export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  return ctx;
};
