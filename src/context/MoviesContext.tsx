import { createContext, useContext, useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetails, searchMovies } from "../api/moviesApi";

//Types for API responses
type ApiMovie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

type ApiMovieDetails = {
  imdbRating?: string;
};

//Internal app type
export type Movie = {
  id: string;
  title: string;
  poster: string | null;
  releaseDate: string;
  rating: string;
};

//Context type
type MoviesContextType = {
  movies: Movie[];
  searchResults: Movie[];
  loading: boolean;
  loadMovies: () => Promise<void>;
  search: (query: string) => Promise<void>;
};

//Context
const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

//Provider props
type Props = {
  children: React.ReactNode;
};

export function MoviesProvider({ children }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  //Load movies
  async function loadMovies(): Promise<void> {
    if (loading) return;

    setLoading(true);

    try {
      const data: ApiMovie[] = await fetchMovies(page);

      const enriched: Movie[] = await Promise.all(
        data.map(async (movie) => {
          const details: ApiMovieDetails = await fetchMovieDetails(movie.imdbID);

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
        const movieMap = new Map<string, Movie>();

        prev.forEach((m) => movieMap.set(m.id, m));
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

  //Search
  async function search(query: string): Promise<void> {
    if (!query?.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const data: ApiMovie[] = await searchMovies(query.trim());

      const enriched: Movie[] = await Promise.all(
        data.map(async (movie) => {
          const details: ApiMovieDetails = await fetchMovieDetails(movie.imdbID);

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

  //Init
  useEffect(() => {
    loadMovies();
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

//Hook
export function useMovies(): MoviesContextType {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies должен использоваться внутри MoviesProvider");
  }

  return context;
}