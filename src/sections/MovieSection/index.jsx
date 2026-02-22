import styles from "./movies.module.css";
import MovieCard from "../../components/MovieCard";
import { useMovies } from "../../context/MoviesContext";

export default function Movies() {
  const { movies, loadMovies } = useMovies();

  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>

      <button className={styles.loadMore} onClick={loadMovies}>
        Load more
      </button>
    </section>
  );
}