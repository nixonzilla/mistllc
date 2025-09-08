type Item = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export default function ShopItem({ item }: { item: Item }) {
  return (
    <div className="bg-mist-gray rounded-2xl p-4 shadow hover:scale-105 transition">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="rounded-xl mb-3 w-full h-40 object-cover"
        />
      )}
      <h3 className="font-display text-lg text-mist-gold">{item.name}</h3>
      <p className="text-gray-400">${item.price.toFixed(2)}</p>
      <button className="mt-3 px-4 py-2 bg-mist-pink text-white rounded-xl shadow-glow hover:bg-mist-coral transition">
        Add to Cart
      </button>
    </div>
  );
}
