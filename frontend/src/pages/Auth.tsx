/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { apiPost } from "../lib/api";

export default function Auth() {
  const { setUser, addNotification } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await apiPost("/login", { email, password });
      setUser(user);
      addNotification("Logged in successfully!", "success");
    } catch (err: any) {
      addNotification(err.message || "Login failed", "error");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
