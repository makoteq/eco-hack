import { createContext } from "react";
import { APIClient } from "./utils/APIClient";
require("dotenv").config();

export const APP_NAME = "eco-meet";
export const BACKEND_URL = "http://localhost:5000";
export const EVENT_CONTEXT = createContext();
export const API_CLIENT = new APIClient(process.env.DEPLOY ? "" : BACKEND_URL);
//jak robisz deploy to daj na true, a potem git push heroku main
