const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8787";

export async function fetchData() {
  const res = await fetch(`${API_BASE}/hello`);
  return res.json();
}
