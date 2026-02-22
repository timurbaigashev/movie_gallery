const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

/**
 * 🔹 Обычные фильмы (MovieSection)
 */
export async function fetchMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=movie&type=movie&page=${page}`
  );
  

  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search;
}

/**
 * 🔍 Поиск фильмов (SearchSection)
 */
export async function searchMovies(query, page = 1) {
  if (!query) return [];

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`
  );

  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search;
}

/**
 * ⭐ Детали фильма (рейтинг, etc)
 */
export async function fetchMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}`
  );

  return await response.json();
}