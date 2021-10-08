import styles from "./index.module.scss";
import { LOGIN_MANAGER } from "../../constants";
import { BIcon } from "../BIcon";
import { Stack } from "react-bootstrap";
import { updateLogin } from "../../context/Login";

export const UserPanel = (props) => {
    if (!props.state) props.close();

    return (
        <div className={styles.container}>
            <button aria-label="Zamknij" className={styles.closeBtn} onClick={props.close}>
                <BIcon icon="x" size={"20px"} />
            </button>
            <h3>Zalogowano jako</h3>
            <h1>{props.state.email ?? "Nieznany użytkownik"}</h1>
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
                        updateLogin(null);
                        props.history?.push("/");
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
