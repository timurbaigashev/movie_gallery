// src/sections/CommentSection/CommentsSection.jsx
import { useState, useCallback, useMemo, useEffect } from "react";
import CommentForm from "../../components/CommentForm";
import CommentCard from "../../components/CommentCard";
import styles from "./commentsSection.module.css";

const ALL_COMMENTS_KEY = "all_movie_comments";

export default function CommentsSection({ movieTitle = null }) {
  // movieTitle = null → показываем ВСЕ комментарии (страница /comments)
  // movieTitle = "Интерстеллар" → показываем только по этому фильму (модалка)

  const [allComments, setAllComments] = useState(() => {
    const saved = localStorage.getItem(ALL_COMMENTS_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // Текущие комментарии для отображения
  const comments = movieTitle
    ? (allComments[movieTitle] || [])
    : Object.values(allComments).flat();

  // Сохраняем в localStorage
  const saveToStorage = useCallback((updated) => {
    localStorage.setItem(ALL_COMMENTS_KEY, JSON.stringify(updated));
  }, []);

  const addComment = useCallback((newComment) => {
    setAllComments((prev) => {
      const key = movieTitle || "unknown";
      const current = prev[key] || [];
      const updated = {
        ...prev,
        [key]: [newComment, ...current],
      };
      saveToStorage(updated);
      return updated;
    });
  }, [movieTitle, saveToStorage]);

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => b.id - a.id);
  }, [comments]);

  return (
    <section className={styles.section}>
      {/* Показываем форму только если открыта модалка (есть movieTitle) */}
      {movieTitle && (
        <CommentForm
          movieTitle={movieTitle}
          onAddComment={addComment}
        />
      )}

      <div className={styles.comments}>
        {sortedComments.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center", padding: "30px 0" }}>
            {movieTitle
              ? "Пока нет комментариев к этому фильму"
              : "Пока нет ни одного комментария"}
          </p>
        ) : (
          sortedComments.map((comment) => (
            <CommentCard
              key={comment.id}
              name={comment.name}
              movie={comment.movie}
              comment={comment.comment}
            />
          ))
        )}
      </div>
    </section>
  );
}