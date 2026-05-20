// src/sections/MovieSection/index.jsx
import { useState, useEffect } from "react";
import styles from "./movies.module.css";
import MovieCard from "../../components/MovieCard";
import { useFetch } from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import CommentModal from "../../components/CommentModal";

export default function Movies() {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);     // накопление фильмов
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { isOpen, modalData, openModal, closeModal } = useModal();

  const { data, loading, error } = useFetch(
    `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=movie&type=movie&page=${page}`
  );

  // Добавляем новые фильмы в конец списка
  useEffect(() => {
    if (data?.Search && !loading) {
      const newMovies = data.Search.map((movie) => ({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        imdbRating: movie.imdbRating,
        poster: movie.Poster === "N/A"
          ? "https://via.placeholder.com/300x450?text=No+Poster"
          : movie.Poster,
      }));
      setAllMovies((prev) => {
        const existingIds = new Set(prev.map(m => m.imdbID));
        const uniqueNew = newMovies.filter(m => !existingIds.has(m.imdbID));
        return [...prev, ...uniqueNew];
      });
    }
  }, [loading]);

  const handleCommentClick = (title) => {
    openModal({ title });
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
    setTimeout(() => setIsLoadingMore(false), 400);
  };

  if (error) return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;

  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        {allMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={{
              title: movie.Title,
              poster: movie.poster,   // если у тебя есть переменная poster
              releaseDate: movie.Year,
              rating: movie.imdbRating || "N/A",
            }}
            onCommentClick={() => handleCommentClick(movie.Title)}   // ← важно!
          >
            <MovieCard.Header />
            <MovieCard.Body />
            <MovieCard.Footer />
          </MovieCard>
        ))}
      </div>

      {(loading || isLoadingMore) && (
        <p style={{ textAlign: "center", margin: "30px 0" }}>
          Loading movies...
        </p>
      )}

      <button
        className={styles.loadMore}
        onClick={handleLoadMore}
        disabled={loading || isLoadingMore}
      >
        {loading || isLoadingMore ? "Loading..." : "Load more"}
      </button>

      <CommentModal
        movieTitle={modalData?.title}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </section>
  );
}