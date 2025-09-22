import { useEffect, useState } from "react";
import ProductsCard from "../components/ui/ProductCard";
import { fetchProducts, type Product } from "../lib/api";
import { Loader2 } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // TODO: integrate cart logic (global state, context, etc.)
    console.log("Add to cart:", product);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Shop</h1>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 font-medium py-6">{error}</p>
      )}

      {!loading && !error && (
        <ProductsCard products={products} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
}
