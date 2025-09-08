import { useGlobal } from "../../context/GlobalContext";
export default function CartOverlay() {
  const { setCartOpen } = useGlobal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-end">
      <div className="bg-mist-gray w-80 p-6 shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-400 flex-1">Cart is empty.</p>
        <button
          onClick={() => setCartOpen(false)}
          className="mt-4 bg-mist-pink px-4 py-2 rounded-xl hover:bg-mist-coral transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
