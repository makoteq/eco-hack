import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_CLIENT } from "./constants";

(async () => {
    const dbEvents = await API_CLIENT.getEvents();

    ReactDOM.render(
        <React.StrictMode>
            <App events={dbEvents} />
        </React.StrictMode>,
        document.getElementById("root")
    );
})();
