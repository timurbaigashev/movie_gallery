// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Профиль</h1>
      {user.photoURL && <img src={user.photoURL} alt="avatar" width="100" style={{ borderRadius: "50%" }} />}
      <p><strong>Имя:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}