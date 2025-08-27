// shared/types/songs.ts

// Represents a row in the D1 database
export interface SongRow {
  id: number
  title: string
  artist: string
}

// Represents the data needed when creating a new song
export interface SongInput {
  title: string
  artist: string
}

// Response shape for API
export interface SongResponse {
  success: boolean
  data?: SongRow | SongRow[]
  error?: string
}
