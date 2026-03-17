import { createContext, useContext, useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetails, searchMovies } from "../api/moviesApi";

const MoviesContext = createContext(null);

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);           // популярные / основные
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ─── Загрузка популярных фильмов (без дублей) ────────────────
  async function loadMovies() {
    if (loading) return;   // защита от множественных кликов

    setLoading(true);

    try {
      const data = await fetchMovies(page);

      const enriched = await Promise.all(
        data.map(async (movie) => {
          const details = await fetchMovieDetails(movie.imdbID);
          return {
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster === "N/A" ? null : movie.Poster,
            releaseDate: movie.Year,
            rating: details?.imdbRating || "N/A",
          };
        })
      );

      setMovies((prev) => {
        // Самый надёжный способ убрать дубликаты
        const movieMap = new Map();

        // Сначала кладём старые
        prev.forEach((m) => movieMap.set(m.id, m));

        // Новые перезаписывают, если уже были (или добавляются)
        enriched.forEach((m) => movieMap.set(m.id, m));

        return Array.from(movieMap.values());
      });

      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Ошибка загрузки фильмов:", err);
    } finally {
      setLoading(false);
    }
  }

  async function search(query) {
    if (!query?.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const data = await searchMovies(query.trim());

      const enriched = await Promise.all(
        data.map(async (movie) => {
          const details = await fetchMovieDetails(movie.imdbID);
          return {
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster === "N/A" ? null : movie.Poster,
            releaseDate: movie.Year,
            rating: details?.imdbRating || "N/A",
          };
        })
      );


      setSearchResults(enriched);
    } catch (err) {
      console.error("Ошибка поиска:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies(); // первая страница при загрузке
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        searchResults,
        loading,
        loadMovies,
        search,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies должен использоваться внутри MoviesProvider");
  }
  return context;
}