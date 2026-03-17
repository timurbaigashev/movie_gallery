// CommentForm.jsx
import { useState } from "react";
import styles from "./commentForm.module.css";

export default function CommentForm({ onAddComment }) {
    const [name, setName] = useState("");
    const [movie, setMovie] = useState("");
    const [comment, setComment] = useState("");

    // Для ошибок в реальном времени
    const [errors, setErrors] = useState({});

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

    const handleChange = (field, value) => {
        if (field === "name") setName(value);
        if (field === "movie") setMovie(value);
        if (field === "comment") setComment(value);

        // Проверяем поле сразу
        setErrors(prev => ({
            ...prev,
            [field]: validateField(field, value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            name: validateField("name", name),
            movie: validateField("movie", movie),
            comment: validateField("comment", comment),
        };

        setErrors(newErrors);

        // Если есть хотя бы одна ошибка — не отправляем
        if (Object.values(newErrors).some(err => err !== "")) {
            return;
        }

        const newComment = {
            id: Date.now(),
            name: name.trim(),
            movie: movie.trim(),
            comment: comment.trim(),
        };

        onAddComment(newComment);

        setName("");
        setMovie("");
        setComment("");
        setErrors({});
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h2>Оставить комментарий</h2>

                <div className={styles['input-wrapper']}>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={styles['input-wrapper']}>
                    <input
                        type="text"
                        placeholder="Название фильма"
                        value={movie}
                        onChange={(e) => handleChange("movie", e.target.value)}
                    />
                    {errors.movie && <span className={styles.error}>{errors.movie}</span>}
                </div>

                <div className={styles['input-wrapper']}>
                    <textarea
                        placeholder="Ваш комментарий..."
                        value={comment}
                        onChange={(e) => handleChange("comment", e.target.value)}
                    />
                    {errors.comment && <span className={styles.error}>{errors.comment}</span>}
                </div>

                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}