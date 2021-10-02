import { Stack } from "react-bootstrap";
import styles from "./index.module.scss";

export const Home = () => {
    return (
        <div className={styles.con}>
            {" "}
            <Stack gap={1}>
                <div className={styles.item}>First item</div>
                <div className={styles.item}>Second item</div>
                <div className={styles.item}>Third item</div>
            </Stack>
        </div>
    );
};
