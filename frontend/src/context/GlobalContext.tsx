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
import type { Song } from "../lib/api";

// Types
export type User = {
  username: ReactNode;
  id: string;
  name: string;
  email: string;
} | null;

export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type GlobalContextType = {
  // Cart
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;

  // Songs/player (if using)
  queue: Song[];
  setQueue: Dispatch<SetStateAction<Song[]>>;
  currentSong: Song | null;
  setCurrentSong: Dispatch<SetStateAction<Song | null>>;
  playNext: () => void;
  playPrev: () => void;

  // User auth
  user: User;
  setUser: Dispatch<SetStateAction<User>>;

  // Token
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;

  // Theme
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;

  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;

  // Shortcut notify
  notify: (message: string, type?: Notification["type"]) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Cart
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  // Player / Songs
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const playNext = () => {
    if (!currentSong) return;
    const idx = queue.findIndex((s) => s.id === currentSong.id);
    if (idx >= 0 && idx < queue.length - 1) {
      setCurrentSong(queue[idx + 1]);
    }
  };
  const playPrev = () => {
    if (!currentSong) return;
    const idx = queue.findIndex((s) => s.id === currentSong.id);
    if (idx > 0) {
      setCurrentSong(queue[idx - 1]);
    }
  };

  // User + token
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

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};
