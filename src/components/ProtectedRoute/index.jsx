// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Please login or register</h2>
        <p>To view the profile you need to be logged in using Google services.</p>
      </div>
    );
  }

  return children;
}