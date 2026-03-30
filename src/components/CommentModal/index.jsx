// src/components/CommentModal.jsx
import CommentsSection from "../../sections/CommentSection";
import styles from "./commentModal.module.css";

export default function CommentModal({ movieTitle, isOpen, onClose }) {
  if (!isOpen || !movieTitle) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <h2>Комментарии к фильму</h2>
        <h3 className={styles.movieTitle}>{movieTitle}</h3>

        {/* Только один CommentsSection — форма и список внутри него */}
        <CommentsSection movieTitle={movieTitle} />
      </div>
    </div>
  );
}