import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import leaf from "../../assets/leaf.svg";

export default function logo() {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <div className={(styles.logoCon, "d-flex align-items-center justify-content-center")}>
                <span className={styles.logo}>eco-meet</span>
                <img className={styles.leaf} src={leaf} alt="React Logo" />
            </div>
        </Link>
    );
}
