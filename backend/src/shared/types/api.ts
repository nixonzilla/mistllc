// shared/types/api.ts
import type { SongRow } from './songs'

export interface ApiRoutes {
  '/songs:GET': SongRow[]
  '/songs:POST': SongRow
  '/songs/:id:PUT': SongRow
  '/songs/:id:DELETE': { success: boolean }
}

// Generic API response type
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

// Song-specific responses
export type GetSongsResponse = ApiResponse<SongRow[]>
export type CreateSongResponse = ApiResponse<SongRow>
export type UpdateSongResponse = ApiResponse<SongRow>
export type DeleteSongResponse = ApiResponse<{ success: boolean }>
