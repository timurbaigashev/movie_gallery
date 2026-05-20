import { createPortal } from "react-dom";
import CommentsSection from "../../sections/CommentSection";
import styles from "./commentModal.module.css";

export default function CommentModal({ movieTitle, isOpen, onClose }) {
  if (!isOpen || !movieTitle) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <h2>Comments for the movie</h2>
        <h3 className={styles.movieTitle}>{movieTitle}</h3>

        <CommentsSection movieTitle={movieTitle} />
      </div>
    </div>,
    document.body
  );
}