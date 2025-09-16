/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "../../context/GlobalContext";

export default function ProductCard({ product }: { product: any }) {
  const { queue, setQueue } = useGlobalContext();

  const addToQueue = () => {
    setQueue([...queue, product]);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow flex flex-col">
      <p className="font-semibold">{product.name}</p>
      <p className="text-gray-600">${product.price}</p>
      <button
        className="mt-auto bg-green-500 text-white px-4 py-2 rounded"
        onClick={addToQueue}
      >
        Add
      </button>
    </div>
  );
}
