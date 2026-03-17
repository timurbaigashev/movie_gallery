// CommentsSection.jsx
import { useState, useCallback, useMemo } from "react";
import CommentForm from "../../components/CommentForm";
import CommentCard from "../../components/CommentCard";
import styles from "./commentsSection.module.css";

export default function CommentsSection() {
  const [comments, setComments] = useState([]);

  // useCallback — чтобы функция не создавалась заново при каждом рендере
  const addComment = useCallback((newComment) => {
    setComments((prev) => [newComment, ...prev]);
  }, []);

  // Пример useMemo — отсортированные комментарии (от новых к старым по id)
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => b.id - a.id);
  }, [comments]);

  return (
    <section className={styles.section}>
      <CommentForm onAddComment={addComment} />

      <div className={styles.comments}>
        {sortedComments.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>Пока нет комментариев</p>
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