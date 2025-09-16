// frontend/src/pages/Auth.tsx
import { useState } from "react";
import { login, register } from "../lib/api";
import { useGlobalContext } from "../context/GlobalContext";

export default function Auth() {
  const { setUser, addNotification } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = isRegister
        ? await register(email, password, name)
        : await login(email, password);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      addNotification("Authentication successful!", "success");
    } catch (err: unknown) {
      addNotification((err as Error).message, "error");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isRegister ? "Register" : "Login"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p
        className="mt-2 text-sm text-gray-500 cursor-pointer"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
}
