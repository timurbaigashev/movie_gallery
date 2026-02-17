const BASE = "https://www.omdbapi.com/";

function key() {
    const k = process.env.REACT_APP_OMDB_API_KEY;
    if (!k) throw new Error("REACT_APP_OMDB_API_KEY missing in .env");
    return k;
}

async function get(params) {
    const url = new URL(BASE);
    url.searchParams.set("apikey", key());
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    });

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data?.Response === "False") {
        throw new Error(data?.Error || "OMDb request failed");
    }
    return data;
}

// Search returns: Title, Year, imdbID, Type, Poster
export async function searchMovies({ query, page = 1, type = "movie" }) {
    const data = await get({ s: query, page, type });
    return {
        items: data.Search || [],
        total: Number(data.totalResults || 0),
    };
}

// Details returns: imdbRating, Released, ...
export async function movieDetails(imdbID) {
    return get({ i: imdbID, plot: "full" });
}

/**
 * Normalization to your required shape:
 * { id, title, poster, releaseDate, rating }
 */
export function normalizeMovieFromDetails(d) {
    const rating =
        d?.imdbRating && d.imdbRating !== "N/A" ? Number(d.imdbRating) : 0;

    const releaseDate =
        d?.Released && d.Released !== "N/A" ? d.Released : "—";

    const poster =
        d?.Poster && d.Poster !== "N/A" ? d.Poster : "";

    return {
        id: d.imdbID,
        title: d.Title || "Untitled",
        poster,
        releaseDate,
        rating: Number.isFinite(rating) ? Number(rating.toFixed(1)) : 0,
    };
}
