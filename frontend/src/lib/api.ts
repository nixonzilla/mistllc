const BASE_URL = "http://127.0.0.1:8787"; // local dev, change to production URL later

export async function getSongs() {
  const res = await fetch(`${BASE_URL}/songs`);
  return res.json();
}

export async function createSong(title: string, artiste: string) {
  const res = await fetch(`${BASE_URL}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, artiste }),
  });
  return res.json();
}

export async function deleteSong(id: number) {
  const res = await fetch(`${BASE_URL}/songs/${id}`, { method: "DELETE" });
  return res.json();
}
