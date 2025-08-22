import { create } from "zustand"
import axios from "axios"

interface Song {
  id: number
  title: string
  artist: string
  duration: string
}

interface SongsState {
  songs: Song[]
  loading: boolean
  error: string | null
  fetchSongs: () => Promise<void>
}

export const useSongsStore = create<SongsState>((set) => ({
  songs: [],
  loading: false,
  error: null,
  fetchSongs: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get("/api/songs")
      set({ songs: res.data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  }
}))
