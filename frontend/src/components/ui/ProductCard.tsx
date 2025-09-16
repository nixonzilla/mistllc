// frontend/src/components/ui/ProductCard.tsx
import type { Product } from "../../lib/api";

type Props = {
  product: Product;
  onAddToCart: () => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
      <p className="text-mist-gold font-semibold mb-3">${product.price}</p>
      <button
        onClick={onAddToCart}
        className="bg-mist-gold px-4 py-2 rounded-lg text-black hover:bg-yellow-400"
      >
        Add to Cart
      </button>
    </div>
  );
}
