// frontend/src/pages/Shop.tsx

import { useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import type { Product } from "../lib/api";
import { fetchProducts } from "../lib/api";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Simple cart state (placeholder until Cart Context is added)
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    console.log("Added to cart:", product);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    console.log("Removed item at index:", index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}

      {/* Temporary cart preview */}
      {cart.length > 0 && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Cart Preview</h2>
          <ul className="space-y-3">
            {cart.map((item, idx) => (
              <li
                key={`${item.id}-${idx}`}
                className="flex justify-between items-center"
              >
                <div>
                  <span className="font-medium">{item.name}</span>{" "}
                  <span className="text-mist-gold">${item.price}</span>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(idx)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">
            Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
