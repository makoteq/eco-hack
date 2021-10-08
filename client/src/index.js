import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_CLIENT, LOGIN_MANAGER } from "./constants";
import { Events } from "./context/Events";

(async () => {
    const events = await API_CLIENT.fetchEvents();
    await LOGIN_MANAGER.fetchSession();

    ReactDOM.render(
        <React.StrictMode>
            <Events initial={events}>
                <App />
            </Events>
        </React.StrictMode>,
        document.getElementById("root")
    );
})();
