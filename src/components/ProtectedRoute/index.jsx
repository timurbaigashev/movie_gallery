// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Загрузка...</p>;

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Пожалуйста, авторизуйтесь</h2>
        <p>Чтобы увидеть профиль, нужно войти через Google.</p>
      </div>
    );
  }

  return children;
}