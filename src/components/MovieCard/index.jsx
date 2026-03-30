// src/components/MovieCard.jsx
import styles from "./MovieCard.module.css";

export default function MovieCard({ 
  title, 
  poster, 
  releaseDate, 
  rating, 
  onCommentClick   // ← новая пропса
}) {
  return (
    <div className={styles.card}>   {/* убрал button, чтобы можно было кликать по отдельным кнопкам */}
      <div className={styles.posterWrap}>
        {poster ? (
          <img className={styles.poster} src={poster} alt={title} loading="lazy" />
        ) : (
          <div className={styles.posterFallback}>No poster</div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.title} title={title}>
          {title}
        </div>

        <div className={styles.meta}>
          <span>Release: {releaseDate}</span>
        </div>

        <div className={styles.rating}>
          <span className={styles.star}>★</span>
          <span>{rating || "N/A"}</span>
        </div>

        {/* Кнопка комментария */}
        <button 
          className={styles.commentBtn}
          onClick={(e) => {
            e.stopPropagation(); // чтобы не срабатывал клик по всей карточке
            onCommentClick(title);
          }}
        >
          💬 Оставить комментарий
        </button>
      </div>
    </div>
  );
}