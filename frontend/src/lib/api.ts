export type Song = { id: number; title: string; artist: string; duration: string };
export type NewSong = Omit<Song, 'id'>;

const BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || '';

export async function listSongs(opts?: { search?: string; sort?: 'title'|'artist'|'duration' }) {
  const params = new URLSearchParams();
  if (opts?.search) params.set('search', opts.search);
  if (opts?.sort) params.set('sort', opts.sort);
  const url = `${BASE}/songs${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`listSongs failed: ${res.status}`);
  return (await res.json()) as Song[];
}

export async function createSong(song: NewSong) {
  const res = await fetch(`${BASE}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error(`createSong failed: ${res.status}`);
}

export async function updateSong(id: number, song: NewSong) {
  const res = await fetch(`${BASE}/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error(`updateSong failed: ${res.status}`);
}

export async function deleteSong(id: number) {
  const res = await fetch(`${BASE}/songs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`deleteSong failed: ${res.status}`);
}
