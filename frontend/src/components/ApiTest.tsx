import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8787";

export default function ApiTest() {
  const [data, setData] = useState<string>("Loading...");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/hello`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setData(JSON.stringify(json));
      } catch (err) {
        setData(`Failed: ${err}`);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">API Test</h2>
      <p className="font-mono break-all">{data}</p>
    </div>
  );
}
