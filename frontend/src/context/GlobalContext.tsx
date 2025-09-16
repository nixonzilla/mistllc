/* eslint-disable react-refresh/only-export-components */
// frontend/src/context/GlobalContext.tsx
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

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

  // User auth
  user: User;
  setUser: Dispatch<SetStateAction<User>>;

  // Token (for API calls)
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;

  // Theme
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;

  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;

  // Helper
  notify: (message: string, type?: Notification["type"]) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Cart state
  const [cartOpen, setCartOpen] = useState(false);

  // User + token state
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

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

  // Simple alias for addNotification
  const notify = (message: string, type: Notification["type"] = "info") =>
    addNotification(message, type);

  return (
    <GlobalContext.Provider
      value={{
        cartOpen,
        setCartOpen,
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
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
