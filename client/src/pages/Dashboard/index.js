import styles from "./index.module.scss";
import { Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_CLIENT } from "../../constants";
import { container } from "../../global.module.scss";
import { EventPreviewEdit } from "../../components/EventPreviewEdit";
import { LOGIN_MANAGER } from "../../constants";
export const Dashboard = () => {
  const [list, updateList] = useState();
  let array = [];
  useEffect(() => {
    //chce wyrenderować eventpreview ale tylko dla eventów utworzonych przez danego użytkownika
    API_CLIENT.isLogged().then((data) => {
      console.log(data.email);
      if (data !== "not logged") {
        API_CLIENT.getUserEvents(data.email).then((events) => {
          if (events) {
            array.push(events);
            console.log(array);
            render();
          }
        });
      }
    });
  }, []);

  const render = () => {
    updateList(
      array.map((e, i) => {
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
  };
  return (
    <div className={container}>
      {" "}
      <Stack gap={1}>{list}</Stack>
    </div>
  );
};
