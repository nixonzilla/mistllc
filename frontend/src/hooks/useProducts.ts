import { useState, useEffect } from "react";

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  created_at: string;
}

const API_BASE = (import.meta.env.VITE_API_URL as string) ?? "http://127.0.0.1:8787";

type CreateProductInput = Omit<Product, "id" | "created_at">;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = (await res.json()) as Product[];
        if (mounted) setProducts(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  async function createProduct(product: CreateProductInput): Promise<Product> {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Create failed: ${res.status} ${body}`);
      }
      const newProduct = (await res.json()) as Product;
      setProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(message);
    }
  }

  async function updateProduct(id: number, updates: Partial<CreateProductInput>): Promise<Product> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Update failed: ${res.status} ${body}`);
      }
      const updated = (await res.json()) as Product;
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(message);
    }
  }

  async function deleteProduct(id: number): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Delete failed: ${res.status} ${body}`);
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(message);
    }
  }

  return { products, loading, error, createProduct, updateProduct, deleteProduct };
}
