import styles from "./index.module.scss";
import { LOGIN_MANAGER } from "../../constants";
import { BIcon } from "../BIcon";
import { Stack } from "react-bootstrap";

export const UserPanel = (props) => {
    if (!LOGIN_MANAGER.state) props.close();

    return (
        <div className={styles.container}>
            <button aria-label="Zamknij" className={styles.closeBtn} onClick={props.close}>
                <BIcon icon="x" size={"20px"} />
            </button>
            <h3>Zalogowano jako</h3>
            <h1>{LOGIN_MANAGER.state.email ?? "Nieznany użytkownik"}</h1>
            <Stack gap={2}>
                <button
                    aria-label="Dashboard"
                    onClick={() => {
                        props.history?.push("/dashboard");
                        props.close();
                    }}
                >
                    Dashboard
                </button>
                <button
                    aria-label="Wyloguj się"
                    onClick={async () => {
                        await LOGIN_MANAGER.logout();
                        props.close();
                    }}
                    className={styles.logoutBtn}
                >
                    <BIcon icon="box-arrow-right" /> Wyloguj się
                </button>
            </Stack>
        </div>
    );
};
