import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

interface Item {
  id: string;
  name: string;
  price: number;
}

export default function Shop() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await apiGet<Item[]>("/shop/items");
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-white shadow rounded-lg hover:shadow-md transition"
        >
          <h2 className="font-semibold">{item.name}</h2>
          <p className="text-gray-600">${item.price}</p>
        </div>
      ))}
    </div>
  );
}
