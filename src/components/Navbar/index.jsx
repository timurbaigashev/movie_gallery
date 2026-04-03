import styles from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import LogginButton from "../LogginButton";

const Navbar = ({ onOpenControl, theme, onToggleTheme }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <NavLink to="/" className={styles.brand} aria-label="Go to Search">
                        <img src="/logo.png" alt="Movies & Chicks" className={styles.logo} />
                    </NavLink>

                    <div className={styles.actions}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? `${styles.navBtn} ${styles.navBtnActive}` : styles.navBtn
                            }
                        >
                            Search
                        </NavLink>

                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                isActive ? `${styles.navBtn} ${styles.navBtnActive}` : styles.navBtn
                            }
                        >
                            Movies
                        </NavLink>

                        <NavLink
                            to="/comments"
                            className={({ isActive }) =>
                                isActive ? `${styles.navBtn} ${styles.navBtnActive}` : styles.navBtn
                            }
                        >
                            Comments
                        </NavLink>

                        <button
                            type="button"
                            className={styles.navBtn}
                            onClick={onToggleTheme}
                            aria-label="Toggle theme"
                            title="Toggle theme"
                        >
                            {theme === "dark" ? "Dark" : "Light"}
                        </button>

                        {/* <LogginButton/> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
