import styles from "./navbar.module.css";

const Navbar = ({ onOpenControl, theme, onToggleTheme }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img src="/logo.png" alt="Movies & Chicks" className={styles.logo} />

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.navBtn}
                        onClick={onOpenControl}
                        aria-label="Open Control Center"
                    >
                        Control Center
                    </button>

                    <button
                        type="button"
                        className={styles.navBtn}
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? "Dark" : "Light"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
