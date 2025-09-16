// frontend/src/components/layout/CartOverlay.tsx
import { useGlobalContext } from "../../context/GlobalContext";

const CartOverlay = () => {
  const { cartOpen, setCartOpen } = useGlobalContext();

  if (!cartOpen) return null;

  return (
    <div className="cart-overlay">
      <button onClick={() => setCartOpen(false)}>Close</button>
      <h2>Your Cart</h2>
    </div>
  );
};

export default CartOverlay;
