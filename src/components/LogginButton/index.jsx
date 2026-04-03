import { useAuth } from "../../context/AuthContext";

export default function LoginButton() {
  const { user, loginWithGoogle, logout } = useAuth();

  return user ? (
    <button onClick={logout}>Выйти</button>
  ) : (
    <button onClick={loginWithGoogle}>Войти через Google</button>
  );
}