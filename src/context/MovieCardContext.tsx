import { createContext, useContext } from "react";
// @ts-ignore
import type { Movie } from "./MoviesContext.tsx";

//Context type
type MovieCardContextType = {
  movie: Movie;
};

//Context
const MovieCardContext = createContext<MovieCardContextType | undefined>(
  undefined
);

//Hook
export function useMovieCard(): MovieCardContextType {
  const context = useContext(MovieCardContext);
  if (!context) {
    throw new Error(
      "useMovieCard must be used within a <MovieCard> component"
    );
  }
  return context;
}

export default MovieCardContext;