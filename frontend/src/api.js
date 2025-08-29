import api from "./api";

export async function getHello() {
  const res = await axios.get("/api/hello"); // backend proxy in vite.config.ts
  return res.data;
}
export default api