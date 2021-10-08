import { createContext, useContext, useState } from "react";

const login = {
    state: null,
    setter: null,
};

const validateData = (data) => {
    if (data === null) return false;
    if (typeof data !== "object") throw new TypeError("Incorrect argument");
    if (typeof data._id !== "string") throw new TypeError("Incorrect value type: _id");
    if (typeof data.email !== "string") throw new TypeError("Incorrect value type: email");
    return true;
};

export const LoginContext = createContext(login.state);

export const useLogin = () => {
    return useContext(LoginContext);
};

export const updateLogin = (data) => {
    switch (validateData(data)) {
        case true:
            login.setter({
                _id: data._id,
                email: data.email,
            });
            return;
        case false:
            login.setter(null);
            return;
        default:
            return;
    }
};

export const Login = (props) => {
    [login.state, login.setter] = useState(props.initial ?? null);
    return <LoginContext.Provider value={login.state}>{props.children}</LoginContext.Provider>;
};
