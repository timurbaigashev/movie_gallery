// src/components/CommentForm.jsx
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import styles from "./commentForm.module.css";

export default function CommentForm({ movieTitle = "", onAddComment }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    movie: movieTitle,
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const API_KEY = "a68e577d";

  useEffect(() => {
    if (values.movie.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(values.movie.trim())}&type=movie&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response === "True" && data.Search) {
          setSuggestions(data.Search.slice(0, 10));
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (err) {
        console.error("Ошибка автодополнения:", err);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [values.movie]);

  const validateField = (field, value) => {
    if (field === "name") {
      if (!value.trim()) return "Имя обязательно";
      if (value.trim().length < 2) return "Имя слишком короткое";
      return "";
    }
    if (field === "movie") {
      if (!value.trim()) return "Название фильма обязательно";
      return "";
    }
    if (field === "comment") {
      if (!value.trim()) return "Комментарий обязателен";
      if (value.trim().length < 10) return "Комментарий слишком короткий (минимум 10 символов)";
      return "";
    }
    return "";
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", values.name),
      movie: validateField("movie", values.movie),
      comment: validateField("comment", values.comment),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    const newComment = {
      id: Date.now(),
      name: values.name.trim(),
      movie: values.movie.trim(),
      comment: values.comment.trim(),
      date: new Date().toLocaleDateString("ru-RU"),
    };

    onAddComment(newComment);

    // Сброс формы
    resetForm();
    setErrors({});
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const selectSuggestion = (title) => {
    handleChange({ target: { name: "movie", value: title } });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitForm}>
        <h2>Оставить комментарий</h2>

        <div className={styles["input-wrapper"]}>
          <input
            name="name"
            type="text"
            placeholder="Ваше имя"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles["input-wrapper"]} style={{ position: "relative" }}>
          <input
            name="movie"
            type="text"
            placeholder="Название фильма"
            value={values.movie}
            onChange={handleChange}
            onFocus={() => values.movie.trim().length >= 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {errors.movie && <span className={styles.error}>{errors.movie}</span>}

          {showSuggestions && (
            <ul className={styles.suggestions}>
              {loadingSuggestions ? (
                <li className={styles.loading}>Загрузка...</li>
              ) : suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <li
                    key={item.imdbID}
                    onClick={() => selectSuggestion(item.Title)}
                    className={styles.suggestionItem}
                  >
                    {item.Title} ({item.Year})
                  </li>
                ))
              ) : (
                <li className={styles.noResults}>Ничего не найдено</li>
              )}
            </ul>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <textarea
            name="comment"
            placeholder="Ваш комментарий..."
            value={values.comment}
            onChange={handleChange}
          />
          {errors.comment && <span className={styles.error}>{errors.comment}</span>}
        </div>

        <button type="submit">Отправить комментарий</button>
      </form>
    </div>
  );
}