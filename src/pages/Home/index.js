import { Stack } from "react-bootstrap";
import styles from "./index.module.scss";

export const Home = () => {
    const data =[{"name":"test1"},{"name":"test2"}];
    return (
        <div className={styles.con}>
            {" "}
            <Stack gap={1}>
            {data.map(function(d, idx){
         return (<div key={idx} className={styles.item}>{d.name}</div>)
       })}
                
            </Stack>
        </div>
    );
};
