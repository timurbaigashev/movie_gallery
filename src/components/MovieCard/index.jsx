import styles from "./MovieCard.module.css";

export default function MovieCard({ title, poster, releaseDate, rating }) {
  return (
    <div className={styles.card}>
      <img
        src={poster}
        alt={title}
        className={styles.poster}
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.date}>
          Release: <span>{releaseDate}</span>
        </p>

        <div className={styles.rating}>
          ⭐ {rating}
        </div>
      </div>
    </div>
  );
}
