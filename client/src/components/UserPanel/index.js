import styles from "./index.module.scss";
import { LOGIN_MANAGER } from "../../constants";
import { Stack } from "react-bootstrap";
import { BIcon } from "../BIcon";

export const UserPanel = (props) => {
    if (!LOGIN_MANAGER.state) props.close();

    return (
        <div className={styles.container}>
            <button className={styles.closeBtn} onClick={props.close}>
                <BIcon icon="x" size={"20px"} />
            </button>
            <h3>Zalogowano jako</h3>
            <h1>{LOGIN_MANAGER.state.email ?? "Nieznany użytkownik"}</h1>
            <button
                onClick={async () => {
                    await LOGIN_MANAGER.logout();
                    props.close();
                }}
                className={styles.logoutBtn}
            >
                <BIcon icon="box-arrow-right" /> Wyloguj się
            </button>
        </div>
    );
};
