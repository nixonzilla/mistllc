import { create } from "zustand"
import axios from "axios"

interface ApiState {
  message: string | null
  loading: boolean
  error: string | null
  fetchMessage: () => Promise<void>
}

export const useApiStore = create<ApiState>((set) => ({
  message: null,
  loading: false,
  error: null,
  fetchMessage: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get("/api/hello") // 👈 backend endpoint
      set({ message: res.data.message, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  }
}))
