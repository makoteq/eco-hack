import styles from "./index.module.scss";
import { Stack } from "react-bootstrap";
import { useState,useEffect } from "react";
import { API_CLIENT } from "../../constants";
import { container } from "../../global.module.scss";
import { EventPreviewEdit } from "../../components/EventPreviewEdit";
import { LOGIN_MANAGER } from "../../constants";
export const Dashboard = () => {
    useEffect(() => {
        console.log(API_CLIENT.getUserEvents({email:"GRZANA"}).then((d) => {console.log(d)}))
    }, []);
  const [list, updateList] = useState(
    ['o','i'].map((e, i) => {
      return (
        <EventPreviewEdit
          data={{
            name: e.name,
            type: e.type,
            lon: e.lon,
            lat: e.lat,
            createdTime: e.created?.time,
            time: e.time,
            id: e._id,
            address: e.address,
          }}
          key={i}
        />
      );
    })
  );
  return  <div className={container}>  <Stack gap={1}>{list}</Stack></div>;
};
