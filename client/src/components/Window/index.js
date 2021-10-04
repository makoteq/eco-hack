import styles from "./index.module.scss";

export const Window = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.window}>{props.children}</div>
        </div>
    );
};
