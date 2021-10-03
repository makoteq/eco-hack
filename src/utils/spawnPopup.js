import ReactDOM from "react-dom";
import { Window } from "../components/Window";
import { window as windowStyles } from "../components/Window/index.module.scss";

const closeWindow = (resolver) => {
    return (value) => {
        document.getElementsByClassName(windowStyles)[0].animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: "scale(0)", opacity: 0 },
            ],
            {
                easing: "ease",
                duration: 300,
            }
        );
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(document.getElementById("popup-container"));
            document.getElementById("popup-container").style.display = "none";
            resolver(value);
        }, 300);
    };
};

export const spawnPopup = async (elements) => {
    return new Promise((resolve) => {
        document.getElementById("popup-container").style.display = "block";
        ReactDOM.render(<Window>{elements(closeWindow(resolve))}</Window>, document.getElementById("popup-container"));
    });
};
