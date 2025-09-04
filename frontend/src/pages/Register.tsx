export default function Register() {
  return (
    <div className="max-w-md mx-auto bg-mist-gray p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">🆕 Register</h1>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-3 mb-3 rounded-lg bg-black text-white"
      />
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
      <button className="bg-mist-gold px-6 py-3 rounded-lg w-full">
        Register
      </button>
    </div>
  );
}
