// src/components/MovieCard/context/MovieCardContext.jsx

import { createContext, useContext } from 'react';

const MovieCardContext = createContext(null);

export function useMovieCard() {
    const context = useContext(MovieCardContext);

    if (!context) {
        throw new Error(
            'useMovieCard must be used within a <MovieCard> component'
        );
    }

    return context;
}

export default MovieCardContext;