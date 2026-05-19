// src/components/MovieCard/MovieCardFooter.jsx
import styles from './MovieCard.module.css';
import { useMovieCard } from '../../context/MovieCardContext.tsx';

export function MovieCardFooter() {
    const { openCommentModal } = useMovieCard();

    return (
        <button
            className={styles.commentBtn}
            onClick={openCommentModal}
        >
            💬 Оставить комментарий
        </button>
    );
}