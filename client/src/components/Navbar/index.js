import { Link } from "react-router-dom";
import { BIcon } from "../BIcon";
import styles from "./index.module.scss";
import title from "../../assets/title.svg";
import { useLogin } from "../../context/Login";
import { spawnPopup } from "../../utils/popups/spawnPopup";
import { LoginPanel } from "../LoginPanel";
import { UserPanel } from "../UserPanel";
import { useHistory } from "react-router";

export const Navbar = () => {
    const history = useHistory();
    const login = useLogin();

    return (
        <nav className={styles.nav}>
            <Link aria-label="Strona główna" to="/" style={{ textDecoration: "none" }}>
                <img alt="eco-meet title" height="60" src={title} />
            </Link>
            <button
                aria-label="Zarządzanie kontem"
                className={styles.navBtn}
                onClick={async () => {
                    if (login) {
                        await spawnPopup(
                            (close) => {
                                return <UserPanel state={login} history={history} close={close} />;
                            },
                            { minWidth: "30vw" }
                        );
                    } else {
                        await spawnPopup((close) => {
                            return <LoginPanel close={close} />;
                        });
                    }
                }}
            >
                <BIcon size={"30px"} icon="person-circle" />
            </button>
        </nav>
    );
};
