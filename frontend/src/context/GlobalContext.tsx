import { createContext, useContext, useState, ReactNode } from "react";

type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
};

type GlobalContextType = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  user: string | null;
  setUser: (u: string | null) => void;
  currentSong: Song | null;
  setCurrentSong: (s: Song | null) => void;
  playNext: () => void;
  playPrev: () => void;
  queue: Song[];
  setQueue: (songs: Song[]) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);

  const playNext = () => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex((s) => s.id === currentSong.id);
    if (idx >= 0 && idx < queue.length - 1) {
      setCurrentSong(queue[idx + 1]);
    }
  };

  const playPrev = () => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex((s) => s.id === currentSong.id);
    if (idx > 0) {
      setCurrentSong(queue[idx - 1]);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        user,
        setUser,
        currentSong,
        setCurrentSong,
        playNext,
        playPrev,
        queue,
        setQueue,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used inside GlobalProvider");
  return ctx;
}
