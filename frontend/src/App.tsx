import { useState } from "react";
import { User } from "./api";
import Login from "./pages/Login";

function getStoredUser(): User | null {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState<User | null>(getStoredUser());

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <div className="home">
      <header>
        <h1>Reporte de Gastos</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <main>
        <p>Menu en progreso, hola <strong>{user.username}</strong> ({user.role})</p>
      </main>
    </div>
  );
}
