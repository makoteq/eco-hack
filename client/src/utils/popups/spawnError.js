import styles from "./error.module.scss";
import { spawnPopup } from "./spawnPopup";
import { BIcon } from "../../components/BIcon";

export const spawnError = async (details) => {
    await spawnPopup((close) => {
        return (
            <div className={styles.container}>
                <div className={styles.icon}>
                    <BIcon icon="x-circle-fill" />
                </div>
                <h1>Coś poszło nie tak</h1>
                <p>{details}</p>
                <button onClick={close}>Zamknij</button>
            </div>
        );
    });
};
