import axios from "axios";

export interface Song {
  title: string;
  artist: string;
  duration: string;
}

export async function getSongs(): Promise<Song[]> {
  const response = await axios.get("/api/songs");
  return response.data.songs || [];
}
