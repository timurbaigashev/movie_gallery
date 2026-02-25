import Movies from "../../sections/MovieSection";
import styles from "./moviesPage.module.css";

const MoviesPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Movies</h1>
                <p className={styles.sub}>Your curated results live here.</p>
            </div>

            <Movies />
        </div>
    );
};

export default MoviesPage;
