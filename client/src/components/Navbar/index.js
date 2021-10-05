import { Link } from "react-router-dom";
import { BIcon } from "../BIcon";
import styles from "./index.module.scss";
import title from "../../assets/title.svg";

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/" style={{ textDecoration: "none" }}>
                <img alt="eco-meet title" height="60" src={title} />
            </Link>
            <Link to="/login" size={"70px"}>
                <BIcon size={"30px"} icon="person-circle" />
            </Link>
        </nav>
    );
};
