import CommentsSection from "../../sections/CommentSection";
import styles from "./commentPage.module.css";

const   CommentPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <CommentsSection />
            </div>
        </div>
    );
};

export default CommentPage;
