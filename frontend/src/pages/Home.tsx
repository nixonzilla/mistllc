// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { fetchSongs, fetchProducts } from "../lib/api";
import type { Song, Product } from "../lib/types";
import SongsCard from "../features/songs/SongCard";
import ProductsCard from "../components/ui/ProductCard";

const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedSongs, fetchedProducts] = await Promise.all([
          fetchSongs(),
          fetchProducts(),
        ]);
        setSongs(fetchedSongs);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p className="text-gray-400 mt-8">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">🎶 Latest Songs</h2>
      <SongsCard songs={songs} />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        🛍️ Shop Products
      </h2>
      <ProductsCard products={products} />
    </div>
  );
};

export default Home;
