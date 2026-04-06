import { useAuth } from "../../context/AuthContext";
import styles from "./LoginButton.module.css";

export default function LoginButton() {
  const { user, loginWithGoogle, logout } = useAuth();

  return user ? (
    <button className={styles.Btn} onClick={logout}>Выйти</button>
  ) : (
    <button className={styles.Btn} onClick={loginWithGoogle}>Войти через Google</button>
  );
}