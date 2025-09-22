// frontend/src/components/layout/CartOverlay.tsx
import { useGlobalContext } from "../../context/useGlobalContext";

export default function CartOverlay() {
  const { cartOpen, setCartOpen, cart, removeFromCart } = useGlobalContext();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="w-80 bg-white dark:bg-gray-800 p-4 shadow-lg h-full flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="flex-1 overflow-y-auto space-y-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="mt-4 border-t pt-2">
            <p className="font-semibold">
              Total: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
