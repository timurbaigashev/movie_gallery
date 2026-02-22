import styles from "./searchSection.module.css";
import MovieSearch from "../../components/MovieSearch";
import MovieCard from "../../components/MovieCard";
import { useMovies } from "../../context/MoviesContext";

export default function SearchSection() {
  const { searchResults, search, loading } = useMovies();

  return (
    <section className={styles.section}>
      <MovieSearch onSearch={search} loading={loading} />

      <div className={styles.results}>
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  );
}