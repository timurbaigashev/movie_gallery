import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img src="/logo.png" alt="Avatar" className={styles.logo} />
            </div>
        </div>
    );
};

export default Navbar;