import { useEffect, useState } from "react";
import { getHello } from "./api";

export default function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    getHello().then(data => setMessage(data.message)).catch(() => setMessage("Error fetching"));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MISTLLC Fullstack App</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}
