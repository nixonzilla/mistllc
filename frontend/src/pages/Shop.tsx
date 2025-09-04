import { useEffect, useState } from "react";
import { fetchProducts, checkout } from "../lib/api";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  function addToCart(product: any) {
    setCart([...cart, product]);
  }

  async function handleCheckout() {
    const token = localStorage.getItem("token") || "";
    const res = await checkout(cart, token);
    alert(`Checkout successful: ${res.message || "Thank you!"}`);
    setCart([]);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="p-4 bg-white rounded-xl shadow flex flex-col"
          >
            <p className="font-semibold">{p.name}</p>
            <p className="text-gray-600">${p.price}</p>
            <button
              className="mt-auto bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <h2 className="text-lg font-bold">Cart</h2>
          <ul>
            {cart.map((c, i) => (
              <li key={i}>{c.name} - ${c.price}</li>
            ))}
          </ul>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
