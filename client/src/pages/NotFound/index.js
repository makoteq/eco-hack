import styles from "./index.module.scss";

export const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <h2>Podany adres nie został odnaleziony</h2>
        </div>
    );
};
