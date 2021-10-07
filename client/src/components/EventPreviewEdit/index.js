import { BIcon } from "../BIcon";
import styles from "./index.module.scss";
import { EventType } from "../EventType";
import { API_CLIENT } from "../../constants";
export const EventPreviewEdit = (props) => {
  const getDate = (time) => {
    let date = new Date(time);
    return date.toLocaleDateString(navigator.language);
  };
  const getTime = (time) => {
    let date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const deleteItem = (arg) => {
    console.log("deleting..."+arg)
    API_CLIENT.deleteEvent({id:arg});
  };
  return (
    <div  className={styles.link}>
      <div className={styles.item}>
        <div className="d-flex justify-content-between align-items-center ">
          
          <span className={styles.name}>
            {props.data.name ?? "Event name"}
          </span>
          <br></br>
          <span onClick={()=>deleteItem(props.data.id)} className={styles.trash}>
            <BIcon icon="trash" />
          </span>
        </div>
    );
};
