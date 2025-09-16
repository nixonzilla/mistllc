/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface GlobalContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  notifications: Notification[];
  addNotification: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;
  removeNotification: (id: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load session from localStorage when app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Keep localStorage in sync when user or token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, token]);

  // ✅ Notifications
  function addNotification(
    message: string,
    type: "success" | "error" | "info"
  ) {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  }

  function removeNotification(id: number) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notifications,
        addNotification,
        removeNotification,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
}
