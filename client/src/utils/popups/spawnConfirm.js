import styles from "./confirm.module.scss";
import { spawnPopup } from "./spawnPopup";
import { BIcon } from "../../components/BIcon";

export const spawnConfirm = async (details) => {
    await spawnPopup((close) => {
        return (
            <div className={styles.container}>
                <div className={styles.icon}>
                    <BIcon size={"120px"} icon="question-circle-fill" />
                </div>
                <h3>{details}</h3>
                <button className={styles.button} onClick={() => close(true)}>
                    Tak
                </button>
                <button className={styles.button} onClick={() => close(false)}>
                    Nie
                </button>
            </div>
        );
    });
};
