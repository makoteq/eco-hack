import styles from "./index.module.scss";
import { container } from "../../global.module.scss";
import { Stack } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { LOGIN_MANAGER } from "../../constants";
import { spawnError } from "../../utils/popups/spawnError";
import { BIcon } from "../BIcon";
import { updateLogin } from "../../context/Login";

export const LoginPanel = (props) => {
    const form = useRef(null);
    useEffect(() => {
        form.current.addEventListener("submit", (e) => {
            e.preventDefault();
            LOGIN_MANAGER.login({ email: e.srcElement[0].value, password: e.srcElement[1].value })
                .then((r) => {
                    updateLogin(r);
                    props.close(r);
                })
                .catch((e) => {
                    console.error(e);
                    spawnError(e.toString());
                    props.close();
                });
        });
    }, [props]);

    return (
        <>
            <div className={container}>
                <button className={styles.closeBtn} aria-label="Zamknij" onClick={props.close}>
                    <BIcon icon="x" size={"20px"} />
                </button>
                <p className={styles.title}>Zaloguj się</p>
                <form ref={form}>
                    <Stack gap={2}>
                        <input type="text" autoComplete={"username"} placeholder="Nazwa użytkownika"></input>
                        <input type="password" autoComplete={"current-password"} placeholder="Hasło"></input>
                        <button type="submit" aria-label="Zaloguj się" className={"greenButton"}>
                            Zaloguj się
                        </button>
                    </Stack>
                </form>
            </div>
        </>
    );
};
