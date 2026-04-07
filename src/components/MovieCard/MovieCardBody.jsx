// src/components/MovieCard/MovieCardBody.jsx
import styles from './MovieCard.module.css';
import { useMovieCard } from '../../context/MovieCardContext';

export function MovieCardBody() {
    const { movie } = useMovieCard();
    return (
        <div className={styles.body}>
            <div className={styles.title} title={movie.title}>
                {movie.title}
            </div>

            <div className={styles.meta}>
                <span>Release: {movie.releaseDate}</span>
            </div>

            <div className={styles.rating}>
                <span className={styles.star}>★</span>
                <span>{movie.rating || "N/A"}</span>
            </div>
        </div>
    );
}