// src/pages/Profile.jsx
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>My profile</h1>
      
      {user.photoURL && (
        <img 
          src={user.photoURL} 
          alt="avatar" 
          width="120" 
          style={{ borderRadius: "50%", marginBottom: "20px" }} 
        />
      )}

      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={logout} style={{ marginTop: "30px", padding: "12px 24px" }}>
        Logout from the account
      </button>
    </div>
  );
}