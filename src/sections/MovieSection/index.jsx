import styles from "./movies.module.css";
import MovieCard from "../../components/MovieCard";
import { movies } from "../../content/movies";

export default function Movies() {
  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            releaseDate={movie.releaseDate}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>

  );
}
