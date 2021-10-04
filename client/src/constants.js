import { createContext } from "react";
import { APIClient } from "./utils/APIClient";

require("dotenv").config();

export const BACKEND_URL = "http://localhost:5000";
export const EVENT_CONTEXT = createContext();
export const API_CLIENT = new APIClient(process.env.DEPLOY ? "" : BACKEND_URL);
export const POPUP_CONTAINER = document.getElementById("popup-container");
export const POPUP_BACKGROUND = "rgba(0,0,0,0.75)";
export const POPUP_ANIMATION_DURATION = 300;
//jak robisz deploy to daj na true, a potem git push heroku main
