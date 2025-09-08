import { useGlobal } from "../context/GlobalContext";

export default function Login() {
  const { setUser } = useGlobal();

  const handleLogin = () => {
    setUser("demo-user");
  };

  return (
    <div className="max-w-md mx-auto bg-mist-gray p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">🔑 Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-3 rounded-lg bg-black text-white"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-3 rounded-lg bg-black text-white"
      />
      <button
        onClick={handleLogin}
        className="bg-mist-pink px-6 py-3 rounded-lg w-full"
      >
        Login
      </button>
    </div>
  );
}
