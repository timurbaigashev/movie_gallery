const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(query = "movie", page = 1) {
    const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`
    );

    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(data.Error);
    }

    return {
        items: Array.isArray(data.Search) ? data.Search : [],
        totalResults: Number(data.totalResults || 0),
    };
}

export async function fetchMovieDetails(id) {
    const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${id}`
    );
    const data = await response.json();

    if (data?.Response === "False") {
        throw new Error(data.Error || "Details not found");
    }

    return data;
}

export async function fetchAllMovies(query, { maxPages = 20, signal } = {}) {
    const first = await fetchMovies(query, 1);

    const totalPages = Math.min(
        Math.ceil((first.totalResults || first.items.length) / 10) || 1,
        maxPages
    );

    let all = [...first.items];

    for (let p = 2; p <= totalPages; p++) {
        if (signal?.aborted) throw new Error("Aborted");

        const pageRes = await fetchMovies(query, p);
        all = all.concat(pageRes.items);

        if (pageRes.items.length < 10) break;
    }

    return {
        items: all,
        totalResults: first.totalResults,
        loadedPages: totalPages,
        capped: totalPages >= maxPages,
    };
}