const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function fetchData() {
  const res = await fetch(`${API_BASE}/hello`);
  return res.json();
}
