import { useGlobal } from "../../context/GlobalContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  previewUrl?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { setCartOpen, setQueue, setCurrentSong } = useGlobal();

  const addToCart = () => {
    setCartOpen(true); // future: expand cart system
  };

  const playPreview = () => {
    if (!product.previewUrl) return;
    const previewSong = {
      id: product.id,
      title: product.name + " (Preview)",
      artist: "MISTLLC",
      url: product.previewUrl,
    };
    setQueue([previewSong]);
    setCurrentSong(previewSong);
  };

  return (
    <div className="bg-mist-gray rounded-2xl p-4 shadow-lg">
      <img src={product.image} alt={product.name} className="rounded-xl mb-3" />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-mist-gold font-semibold">${product.price}</p>

      <div className="flex gap-3 mt-3">
        <button
          onClick={addToCart}
          className="bg-mist-pink px-4 py-2 rounded-lg hover:bg-mist-coral transition"
        >
          Add to Cart
        </button>
        {product.previewUrl && (
          <button
            onClick={playPreview}
            className="bg-mist-gold px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            ▶ Preview
          </button>
        )}
      </div>
    </div>
  );
}
