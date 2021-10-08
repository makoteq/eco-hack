import { useState, createContext, useContext } from "react";

const events = {
    value: [],
    setter: null,
};

const validateData = (event) => {
    // VALIDATE INPUT DATA
    if (typeof event !== "object") throw new TypeError("Incorrect argument");
    if (typeof event._id !== "string") throw new TypeError("Invalid ID");
    if (typeof event.name !== "string") throw new TypeError("Incorrect value type: name");
    if (typeof event.type !== "number") throw new TypeError("Incorrect value type: type");
    if (event.description && typeof event.description !== "string") throw new TypeError("Incorrect value type: description");
    if (event.address && typeof event.address !== "string") throw new TypeError("Incorrect value type: address");
    if (typeof event.time !== "number") throw new TypeError("Incorrect value type: time");
    if (event.lon && typeof event.lon !== "number") throw new TypeError("Incorrect value type: lon");
    if (event.lat && typeof event.lat !== "number") throw new TypeError("Incorrect value type: lat");
    if (typeof event.created !== "object") throw new TypeError("Incorrect value type: created");
    if (typeof event.created.time !== "number") throw new TypeError("Incorrect value type: created.time");
    if (typeof event.user !== "string") throw new TypeError("Incorrect value type: user");
};

export const EventContext = createContext(events.value);

export const useEvents = () => {
    return useContext(EventContext);
};

export const addEvent = (event) => {
    validateData(event);
    events.setter([...events.value, event]);
};

export const removeEvent = (id) => {
    const target = events.value.findIndex((event) => event._id === id);
    if (target === -1) {
        console.error(`Cannot find event with ID ${id}`);
        return;
    }
    const list = events.value;
    list.splice(target, 1);
    events.setter([...list]);
};

export const Events = (props) => {
    [events.value, events.setter] = useState(Array.isArray(props.initial) ? props.initial : []);
    return <EventContext.Provider value={events.value}>{props.children}</EventContext.Provider>;
};
