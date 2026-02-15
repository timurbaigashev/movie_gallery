import styles from './footer.module.css';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p>© 2026 BrazzersProduction. All rigts secured.</p>
                <p>Designed by Jony Sins</p>
            </div>
        </div>
    );
};

export default Footer;