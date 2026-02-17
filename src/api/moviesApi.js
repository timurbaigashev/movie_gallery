const API_KEY = "e1adaf18";
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=movie&type=movie&page=${page}`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data.Search;
}

export async function fetchMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}`
  );

  return await response.json();
}
