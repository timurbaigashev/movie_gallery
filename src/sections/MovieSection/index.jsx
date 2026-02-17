import { useEffect, useState } from "react";
import styles from "./movies.module.css";
import MovieCard from "../../components/MovieCard";
import { fetchMovies, fetchMovieDetails } from "../../api/moviesApi";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    const data = await fetchMovies(page);

    const moviesWithRating = await Promise.all(
      data.map(async (movie) => {
        const details = await fetchMovieDetails(movie.imdbID);

        return {
          id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          releaseDate: movie.Year,
          rating: details.imdbRating, 
        };
      })
    );

    setMovies((prev) => [...prev, ...moviesWithRating]);
    setPage((prev) => prev + 1);
  }

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

      <button className={styles.loadMore} onClick={loadMovies}>
        Load more
      </button>
    </div>
  );
}
