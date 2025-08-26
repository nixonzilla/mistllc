import { useEffect, useState } from "react";
import { User, GetUsersResponse } from "@shared/api";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: GetUsersResponse) => {
        if (data.success && data.data) {
          setUsers(data.data);
        }
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">MISTLLC Users</h1>
      <ul className="mt-2">
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
