import ReactDOM from "react-dom";
import { window as windowClass } from "../../components/Window/index.module.scss";
import { POPUP_CONTAINER, POPUP_ANIMATION_DURATION, POPUP_BACKGROUND } from "../../constants";

export const closePopup = () => {
    const window = document.getElementsByClassName(windowClass)[0];

    if (POPUP_CONTAINER?.innerHTML !== "") {
        POPUP_CONTAINER.animate([{ backgroundColor: POPUP_BACKGROUND }, { backgroundColor: "rgba(0,0,0,0)" }], {
            easing: "ease",
            duration: POPUP_ANIMATION_DURATION,
            fill: "both",
        });
        window?.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: "scale(0)", opacity: 0 },
            ],
            {
                easing: "ease",
                duration: POPUP_ANIMATION_DURATION,
            }
        );
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(POPUP_CONTAINER);
            POPUP_CONTAINER.style.display = "none";
        }, POPUP_ANIMATION_DURATION);
    }
};
