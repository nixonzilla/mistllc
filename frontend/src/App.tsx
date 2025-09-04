import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    // Adjust if backend runs on a different port
    fetch("http://localhost:8787/") 
      .then((res) => {
        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        return res.text();
      })
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error(err);
        setMessage("⚠️ Could not connect to backend");
      });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">{message}</h1>
    </div>
  );
}

export default App;
