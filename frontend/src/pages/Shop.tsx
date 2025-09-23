import React, { useEffect, useState } from "react";
import { fetchProducts } from "../lib/api";
import ProductsCard from "../components/ui/ProductCard";
import { Product } from "../lib/types";

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shop</h1>

      {loading && (
        <div className="text-center py-20 text-gray-500">
          Loading products...
        </div>
      )}

      {error && <div className="text-center py-20 text-red-500">{error}</div>}

      {!loading && !error && <ProductsCard products={products} />}
    </div>
  );
};

export default Shop;
