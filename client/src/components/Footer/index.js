import { Link } from "react-router-dom";
import { BIcon } from "../BIcon";
import styles from "./index.module.scss";

export const Footer = () => {

    return (
       <div className={styles.footer}><Link aria-label="Credits" to="/credits" style={{ textDecoration: "none" }}><span className={styles.txt}>credits</span></Link></div>
    );
};
