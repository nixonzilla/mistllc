// frontend/src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";
import * as api from "../lib/api"; // Ensure api.register exists

const Register = () => {
  const { setUser, setToken, notify } = useGlobalContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.register({ name, email, password });
      if (!response || !response.user || !response.token) {
        throw new Error("Invalid registration response");
      }

      setUser(response.user);
      setToken(response.token);
      notify("Registration successful!", "success");

      navigate("/");
    } catch (err: unknown) {
      // Narrow error type safely
      const message =
        err instanceof Error ? err.message : "Registration failed";
      console.error("Registration error:", message);
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
