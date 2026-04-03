import { memo } from "react";
import styles from "./commentCard.module.css";

const CommentCard = memo(({ name, movie, comment }) => {
    return (
        <div className={styles.card}>
            <h4>{movie}</h4>
            <span className={styles.author}>от {name}</span>
            <p className={styles.text}>{comment}</p>
        </div>
    );
});

export default CommentCard;