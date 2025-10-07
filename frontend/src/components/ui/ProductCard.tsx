// src/components/ui/ProductsCard.tsx
import React from "react";
import type { Product } from "../../lib/types";

type ProductsCardProps = {
  products: Product[];
};

const ProductsCard: React.FC<ProductsCardProps> = ({ products }) => {
  if (!products.length)
    return <p className="text-gray-400">No products available</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
        >
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="text-gray-400">
            {product.description || "No description provided."}
          </p>
          <p className="text-gray-200 font-bold mt-2">
            ${product.price.toFixed(2)}
          </p>
          <button className="mt-auto bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsCard;
