import { useTitle } from "../../utils/useTitle";
import styles from "./index.module.scss";
import { container } from "../../global.module.scss";
import { Stack } from "react-bootstrap";
import { useEffect, useRef } from "react";

export const LoginPage = () => {
    const form = useRef(null);
    useTitle("Logowanie");
    useEffect(() => {
        form.current.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log(e);
        });
    }, []);

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
