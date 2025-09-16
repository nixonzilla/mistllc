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

// ------------------- TYPES -------------------
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

export type GlobalContextType = {
  // Cart
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;

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

// ------------------- CONTEXT -------------------
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// ------------------- PROVIDER -------------------
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Cart state
  const [cartOpen, setCartOpen] = useState(false);

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

// ------------------- HOOK -------------------
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
