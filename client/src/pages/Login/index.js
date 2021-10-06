import { useTitle } from "../../utils/useTitle";
import styles from "./index.module.scss";
import { container } from "../../global.module.scss";
import { Stack } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { LOGIN_MANAGER } from "../../constants";
import { useHistory } from "react-router";
import { spawnError } from "../../utils/popups/spawnError";

export const LoginPage = () => {
    const history = useHistory();
    const form = useRef(null);
    useTitle("Logowanie");
    useEffect(() => {
        form.current.addEventListener("submit", (e) => {
            e.preventDefault();
            LOGIN_MANAGER.login({ email: e.srcElement[0].value, password: e.srcElement[1].value })
                .then((r) => {
                    console.log(r);
                    history.push("/");
                })
                .catch((e) => {
                    console.error(e);
                    spawnError(e.toString());
                });
        });
    }, [history]);

    return (
        <>
            <div className={container}>
                <p className={styles.title}>Zaloguj się</p>
                <form ref={form}>
                    <Stack gap={2}>
                        <input type="text" autoComplete={"username"} placeholder="Nazwa użytkownika"></input>
                        <input type="password" autoComplete={"current-password"} placeholder="Hasło"></input>
                        <button type="submit" className={"greenButton"}>
                            Zaloguj się
                        </button>
                    </Stack>
                </form>
            </div>
        </>
    );
};
