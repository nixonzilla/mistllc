import { type Dispatch, type SetStateAction } from "react";

// User
export type User = {
  id: string;
  name: string;
  email: string;
} | null;

// Notification
export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

// Cart Item
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Product
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  inStock?: boolean;
};

// Song
export type Song = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  audioUrl: string;
  duration?: number; // seconds
  releaseDate?: string; // ISO string
  genre?: string;
};

// Global Context
export type GlobalContextType = {
  // Cart
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;

  // Player
  queue: Song[]; // changed from any[] to Song[]
  setQueue: Dispatch<SetStateAction<Song[]>>;
  currentSong: Song | null;
  setCurrentSong: Dispatch<SetStateAction<Song | null>>;
  playNext: () => void;
  playPrev: () => void;

  // Auth
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
