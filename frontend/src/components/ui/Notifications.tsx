// frontend/src/components/ui/Notifications.tsx
import { useGlobalContext } from "../../context/GlobalContext";

const Notifications = () => {
  const { notifications, removeNotification } = useGlobalContext();

  return (
    <div className="notifications">
      {notifications.map((n) => (
        <div key={n.id} className={`notification ${n.type}`}>
          <span>{n.message}</span>
          <button onClick={() => removeNotification(n.id)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
