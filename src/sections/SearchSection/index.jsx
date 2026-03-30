// src/sections/SearchSection/SearchSection.jsx
import { useState } from "react";
import styles from "./searchSection.module.css";
import MovieSearch from "../../components/MovieSearch";
import MovieCard from "../../components/MovieCard";
import { useFetch } from "../../hooks/useFetch";
import { useModal } from "../../hooks/useModal";
import { useFilter } from "../../hooks/useFilter";
import CommentModal from "../../components/CommentModal"; 

export default function SearchSection() {
  const [query, setQuery] = useState("");

  const { isOpen, modalData, openModal, closeModal } = useModal();

  const url = query
    ? `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    : null;

  const { data, loading, error } = useFetch(url);

  const searchResults = data?.Search || [];

  // useFilter
  const filteredResults = useFilter(searchResults, {
    search: query,
    sortBy: "rating",
  });

  const handleSearch = (searchText) => {
    setQuery(searchText);
  };

  const handleCommentClick = (title) => {
    openModal({ title });
  };

  if (error) return <p style={{ color: "red", textAlign: "center" }}>Ошибка поиска: {error}</p>;

  return (
    <section className={styles.section}>
      <MovieSearch onSearch={handleSearch} loading={loading} />

      <div className={styles.results}>
        {loading && <p style={{ textAlign: "center" }}>Ищем...</p>}

        {filteredResults.map((movie) => {
          const poster = movie.Poster === "N/A"
            ? "https://via.placeholder.com/300x450?text=No+Poster"
            : movie.Poster;

          return (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={poster}
              releaseDate={movie.Year}
              rating={movie.imdbRating || "N/A"}
              onCommentClick={handleCommentClick}
            />
          );
        })}
      </div>

      {/* Модальное окно */}
      <CommentModal
        movieTitle={modalData?.title}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </section>
  );
}




// import styles from "./searchSection.module.css";
// import MovieSearch from "../../components/MovieSearch";
// import MovieCard from "../../components/MovieCard";
// import { useFetch } from "../../hooks/useFetch";
// import { useState } from "react";

// export default function SearchSection() {
//   const [query, setQuery] = useState("");

//   const url = query
//     ? `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
//     : null;

//   const { data, loading, error } = useFetch(url);

//   const searchResults = data?.Search || [];

//   const handleSearch = (searchText) => {
//     setQuery(searchText);
//   };

//   if (error) return <p style={{ color: "red", textAlign: "center" }}>Ошибка поиска: {error}</p>;

//   return (
//     <section className={styles.section}>
//       <MovieSearch onSearch={handleSearch} loading={loading} />

//       <div className={styles.results}>
//         {loading && <p style={{ textAlign: "center" }}>Ищем...</p>}

//         {!loading && query && searchResults.length === 0 && (
//           <p style={{ textAlign: "center" }}>Ничего не найдено</p>
//         )}

//         {searchResults.map((movie) => {
//           const poster = movie.Poster === "N/A" 
//             ? "https://via.placeholder.com/300x450?text=No+Poster" 
//             : movie.Poster;

//           return (
//             <MovieCard 
//               key={movie.imdbID}
//               id={movie.imdbID}
//               title={movie.Title}
//               poster={poster}
//               releaseDate={movie.Year}
//               {...movie}
//             />
//           );
//         })}
//       </div>
//     </section>
//   );
// }