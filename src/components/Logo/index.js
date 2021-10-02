import styles from "./index.module.scss";
import leaf from "../../assets/leaf.svg"
  export default function logo() {
    return (
      <div className="d-flex align-items-center justify-content-center">
     <span>eco-meet</span>
     <img className={styles.leaf} src={leaf} alt="React Logo" />
     </div>
    );
  }
  
