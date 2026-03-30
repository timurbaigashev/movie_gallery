// src/sections/MovieSection/index.jsx
import { useState } from "react";
import styles from "./movies.module.css";
import MovieCard from "../../components/MovieCard";
import { useFetch } from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import { useFilter } from "../../hooks/useFilter";
import CommentModal from "../../components/CommentModal";

export default function Movies() {
  const [page, setPage] = useState(1);

  // Хуки
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const { data, loading, error } = useFetch(
    `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=movie&type=movie&page=${page}`
  );

  const movies = data?.Search || [];

  // useFilter — фильтрация и сортировка
  const filteredMovies = useFilter(movies, {
    search: "",           // можно добавить поиск позже
    sortBy: "rating",     // по умолчанию сортируем по рейтингу
  });

  const handleCommentClick = (title) => {
    openModal({ title });
  };

  if (error) return <p style={{ color: "red", textAlign: "center" }}>Ошибка: {error}</p>;

  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        {filteredMovies.map((movie) => {
          const poster = movie.Poster === "N/A"
            ? "https://via.placeholder.com/300x450?text=No+Poster"
            : movie.Poster;

          return (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={poster}
              releaseDate={movie.Year}
              rating={movie.imdbRating || "N/A"}
              onCommentClick={handleCommentClick}
            />
          );
        })}
      </div>

      {loading && <p style={{ textAlign: "center" }}>Загрузка фильмов...</p>}

      <button
        className={styles.loadMore}
        onClick={() => setPage((p) => p + 1)}
        disabled={loading}
      >
        {loading ? "Загрузка..." : "Load more"}
      </button>

      {/* Модальное окно */}
      <CommentModal
        movieTitle={modalData?.title}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </section>
  );
}