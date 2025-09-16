/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Song } from "../lib/api";

// Define a user type (can be expanded later)
export type User = {
  id: string;
  name: string;
  email: string;
} | null;

// Define notification type
export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export type GlobalContextType = {
  // Cart
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;

  // Songs & player
  queue: Song[];
  setQueue: Dispatch<SetStateAction<Song[]>>;
  currentSong: Song | null;
  setCurrentSong: Dispatch<SetStateAction<Song | null>>;
  playNext: () => void;
  playPrev: () => void;

  // User auth
  user: User;
  setUser: Dispatch<SetStateAction<User>>;

  // Theme
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;

  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Cart state
  const [cartOpen, setCartOpen] = useState(false);

  // Songs & player
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

  // User state
  const [user, setUser] = useState<User>(null);

  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Notifications state
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

  return (
    <GlobalContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        queue,
        setQueue,
        currentSong,
        setCurrentSong,
        playNext,
        playPrev,
        user,
        setUser,
        theme,
        setTheme,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
