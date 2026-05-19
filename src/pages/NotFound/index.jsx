import { Link } from "react-router-dom";
import styles from "./notFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.code}>404</div>
                <h1 className={styles.title}>Page not found</h1>
                <p className={styles.sub}>
                    The page you requested doesn’t exist or was moved.
                </p>

                <div className={styles.actions}>
                    <Link to="/" className={styles.btn}>
                        Back to Search
                    </Link>
                    <Link to="/movies" className={styles.btnGhost}>
                        Go to Movies
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
