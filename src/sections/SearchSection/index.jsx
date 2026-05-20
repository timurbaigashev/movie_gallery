// src/sections/SearchSection/SearchSection.jsx
import { useState } from "react";
import styles from "./searchSection.module.css";
import MovieSearch from "../../components/MovieSearch";
import MovieCard from "../../components/MovieCard";
import { useFetch } from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import CommentModal from "../../components/CommentModal";
import MovieListWithRenderProps from "../../components/MovieList/MovieListWithRenderProps";

export default function SearchSection() {
  const [query, setQuery] = useState("");

  const { isOpen, modalData, openModal, closeModal } = useModal();

  const url = query
    ? `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    : null;

  const { data, loading, error } = useFetch(url);

  const searchResults = data?.Search || [];

  const handleSearch = (searchText) => {
    setQuery(searchText);
  };

  // ← Добавили эту функцию
  const handleCommentClick = (title) => {
    openModal({ title });
  };

  if (error) return <p style={{ color: "red", textAlign: "center" }}>Search error: {error}</p>;

  return (
    <section className={styles.section}>
      <MovieSearch onSearch={handleSearch} loading={loading} />

      <MovieListWithRenderProps movies={searchResults}>
        {({ movies: filteredMovies, searchTerm, setSearchTerm, sortBy, setSortBy }) => (
          <>
            {/* Контролы сортировки */}
            <div className={styles.controls}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Sort by Rating (High to Low)</option>
                <option value="title">Sort by Title (A-Z)</option>
                <option value="year">Sort by Year (Newest)</option>
              </select>
            </div>

            {/* Сетка карточек */}
            <div className={styles.results}>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => {
                  const poster = movie.Poster === "N/A"
                    ? "https://via.placeholder.com/300x450?text=No+Poster"
                    : movie.Poster;

                  return (
                    <MovieCard
                      key={movie.imdbID}
                      movie={{
                        title: movie.Title,
                        poster: poster,
                        releaseDate: movie.Year,
                        rating: movie.imdbRating || "N/A",
                      }}
                      onCommentClick={() => handleCommentClick(movie.Title)}   // теперь работает
                    >
                      <MovieCard.Header />
                      <MovieCard.Body />
                      <MovieCard.Footer />
                    </MovieCard>
                  );
                })
              ) : (
                !loading && query && (
                  <p style={{ textAlign: "center", padding: "40px 20px", gridColumn: "1 / -1" }}>
                    Nothing was found from your query
                  </p>
                )
              )}
            </div>
          </>
        )}
      </MovieListWithRenderProps>

      <CommentModal
        movieTitle={modalData?.title}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </section>
  );
}