import ReactDOM from "react-dom";
import { Window } from "../../components/Window";
import { window as windowClass } from "../../components/Window/index.module.scss";
import { POPUP_CONTAINER, POPUP_ANIMATION_DURATION, POPUP_BACKGROUND } from "../../constants";

export const spawnPopup = async (elements, windowStyles) => {
    return new Promise((resolve, reject) => {
        const closeWindow = (value) => {
            if (POPUP_CONTAINER.innerHTML === "") reject("Popup closed using closePopup function");
            POPUP_CONTAINER.animate([{ backgroundColor: POPUP_BACKGROUND }, { backgroundColor: "rgba(0,0,0,0)" }], {
                easing: "ease",
                duration: POPUP_ANIMATION_DURATION,
                fill: "both",
            });
            window.animate(
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
                resolve(value ?? null);
            }, POPUP_ANIMATION_DURATION);
        };

        if (POPUP_CONTAINER.innerHTML !== "") {
            reject("Another popup is active");
        }

        POPUP_CONTAINER.style.display = "block";
        ReactDOM.render(<Window style={windowStyles ?? {}}>{elements(closeWindow)}</Window>, POPUP_CONTAINER);
        const window = document.getElementsByClassName(windowClass)[0];
        POPUP_CONTAINER.animate([{ backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: POPUP_BACKGROUND }], {
            easing: "ease",
            duration: POPUP_ANIMATION_DURATION,
            fill: "both",
        });
        window.animate(
            [
                { transform: "scale(0)", opacity: 0 },
                { transform: "scale(1)", opacity: 1 },
            ],
            {
                easing: "ease",
                duration: POPUP_ANIMATION_DURATION,
            }
        );
    });
};
