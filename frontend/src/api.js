import axios from "axios";

export async function getHello() {
  const res = await axios.get("/api/hello"); // backend proxy in vite.config.ts
  return res.data;
}
