import styles from './footer.module.css';

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p>© 2026 BrazzersProduction. All rights secured.</p>
                <p>Designed by Johnny Sins</p>
            </div>
        </div>
    );
};
