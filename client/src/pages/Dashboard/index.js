import styles from "./index.module.scss";
import { Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_CLIENT } from "../../constants";
import { container } from "../../global.module.scss";
import { EventPreviewEdit } from "../../components/EventPreviewEdit";
import { useHistory } from "react-router";
import { LOGIN_MANAGER } from "../../constants";

export const Dashboard = () => {
    const history = useHistory();
    if (LOGIN_MANAGER.state === null) {
        history.push("/");
    }
    const [list, updateList] = useState([]);
    useEffect(() => {
        //chce wyrenderować eventpreview ale tylko dla eventów utworzonych przez danego użytkownika
        API_CLIENT.isLogged().then((data) => {
            console.log(data.email);
            if (data !== "not logged") {
                API_CLIENT.getUserEvents(data.email).then((events) => {
                    if (events) {
                        updateList(events);
                    }
                });
            } else {
                history.push("/");
            }
        });
    }, [history]);

    return (
        <div className={container}>
            <p className={styles.title}>Tu możesz zarządzać swoimi wydarzeniami</p>
            <Stack gap={1}>
                {list.map((e, i) => {
                    return (
                        <EventPreviewEdit
                            onRemove={(id) => {
                                const newList = list;
                                const index = newList.findIndex((el) => id === el._id);
                                if (index !== -1) {
                                    newList.splice(index, 1);
                                    updateList(newList);
                                }
                            }}
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
                })}
            </Stack>
        </div>
    );
};
