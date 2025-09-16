/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/pages/ShopPage.tsx
import { useEffect, useState } from "react";
import { fetchProducts, checkout } from "../lib/api";

export default function ShopPage() {
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
    try {
      const res = await checkout(cart, token);
      alert(`Checkout successful: ${res.message || "Thank you!"}`);
      setCart([]);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛍️ Shop</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="p-4 bg-white text-black rounded-xl shadow flex flex-col hover:shadow-lg transition"
          >
            <p className="font-semibold">{p.name}</p>
            <p className="text-gray-600">${p.price}</p>
            <button
              className="mt-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg text-white">
          <h2 className="text-lg font-bold mb-4">🛒 Cart</h2>
          <ul className="space-y-2">
            {cart.map((c, i) => (
              <li key={i} className="flex justify-between">
                <span>{c.name}</span>
                <span>${c.price}</span>
              </li>
            ))}
          </ul>
          <button
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
