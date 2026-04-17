// src/components/MovieCard/MovieCardHeader.jsx
import styles from './MovieCard.module.css';
import { useMovieCard } from '../../context/MovieCardContext.tsx';

export function MovieCardHeader() {
    const { movie } = useMovieCard();
    return (
        <div className={styles.posterWrap}>
            {movie?.poster ? (
                <img
                    className={styles.poster}
                    src={movie.poster}
                    alt={movie.title}
                    loading="lazy"
                />
            ) : (
                <div className={styles.posterFallback}>No poster</div>
            )}
        </div>
    );
}