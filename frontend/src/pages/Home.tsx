import { useGlobalContext } from "../context/GlobalContext";

export default function Home() {
  const { user } = useGlobalContext();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name || "Guest"}
      </h1>
      <p>Explore music, shop for products, and join the community.</p>
    </div>
  );
}
