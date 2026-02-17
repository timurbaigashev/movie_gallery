import styles from "./MovieCard.module.css";

export default function MovieCard({ title, poster, releaseDate, rating, onOpen }) {
  return (
    <button className={styles.card} onClick={onOpen} type="button">
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
          <span>{rating}</span>
        </div>
      </div>
    </button>
  );
}
