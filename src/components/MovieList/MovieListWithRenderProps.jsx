// src/components/MovieListWithRenderProps.jsx
import { useState, useMemo } from "react";

export default function MovieListWithRenderProps({ movies, children }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("title"); // title, year, rating

    const filteredAndSortedMovies = useMemo(() => {
        let result = [...movies];

        // Фильтрация по поиску
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter((movie) =>
                movie.Title?.toLowerCase().includes(term)
            );
        }

        // Сортировка
        result.sort((a, b) => {
            if (sortBy === "title") {
                return a.Title.localeCompare(b.Title);
            }
            if (sortBy === "year") {
                return parseInt(b.Year) - parseInt(a.Year);
            }
            if (sortBy === "rating") {
                const ratingA = parseFloat(a.imdbRating) || 0;
                const ratingB = parseFloat(b.imdbRating) || 0;
                return ratingB - ratingA;
            }
            return 0;
        });

        return result;
    }, [movies, searchTerm, sortBy]);

    return children({
        movies: filteredAndSortedMovies,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
    });
}