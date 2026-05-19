import { useMemo } from "react";

export function useFilter(movies, filters) {
  return useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];

    let filtered = [...movies];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      filtered = filtered.filter((movie) =>
        movie.Title?.toLowerCase().includes(term)
      );
    }

    if (filters.year) {
      filtered = filtered.filter((movie) => movie.Year === filters.year);
    }

    if (filters.minRating) {
      filtered = filtered.filter((movie) => {
        const rating = parseFloat(movie.imdbRating) || 0;
        return rating >= filters.minRating;
      });
    }

    if (filters.sortBy === "year") {
      filtered.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (filters.sortBy === "rating") {
      filtered.sort((a, b) => {
        const ratingA = parseFloat(a.imdbRating) || 0;
        const ratingB = parseFloat(b.imdbRating) || 0;
        return ratingB - ratingA;
      });
    }

    return filtered;
  }, [movies, filters]);
}