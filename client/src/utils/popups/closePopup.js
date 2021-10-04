import ReactDOM from "react-dom";
import { window as windowClass } from "../../components/Window/index.module.scss";

export const closePopup = () => {
    const container = document.getElementById("popup-container");
    const window = document.getElementsByClassName(windowClass)[0];
    const animationDuration = 300;
    const backgroundColor = "rgba(0,0,0,0.75)";

    if (container?.innerHTML !== "") {
        container.animate([{ backgroundColor: backgroundColor }, { backgroundColor: "rgba(0,0,0,0)" }], {
            easing: "ease",
            duration: animationDuration,
            fill: "both",
        });
        window?.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: "scale(0)", opacity: 0 },
            ],
            {
                easing: "ease",
                duration: animationDuration,
            }
        );
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(container);
            container.style.display = "none";
        }, animationDuration);
    }
};
