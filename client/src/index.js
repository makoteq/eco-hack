import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_CLIENT } from "./constants";

(async () => {
    await API_CLIENT.fetchEvents();

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById("root")
    );
})();
