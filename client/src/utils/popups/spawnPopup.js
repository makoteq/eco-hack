import ReactDOM from "react-dom";
import { Window } from "../../components/Window";
import { window as windowClass } from "../../components/Window/index.module.scss";

export const spawnPopup = async (elements, windowStyles) => {
    const container = document.getElementById("popup-container");
    const backgroundColor = "rgba(0,0,0,0.75)";
    const animationDuration = 300;

    return new Promise((resolve, reject) => {
        const closeWindow = (value) => {
            container.animate([{ backgroundColor: backgroundColor }, { backgroundColor: "rgba(0,0,0,0)" }], {
                easing: "ease",
                duration: animationDuration,
                fill: "both",
            });
            window.animate(
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
                resolve(value ?? null);
            }, animationDuration);
        };

        if (container.innerHTML !== "") {
            reject("Another popup is active");
        }

        container.style.display = "block";
        ReactDOM.render(<Window style={windowStyles ?? {}}>{elements(closeWindow)}</Window>, container);
        const window = document.getElementsByClassName(windowClass)[0];
        container.animate([{ backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: backgroundColor }], {
            easing: "ease",
            duration: animationDuration,
            fill: "both",
        });
        window.animate(
            [
                { transform: "scale(0)", opacity: 0 },
                { transform: "scale(1)", opacity: 1 },
            ],
            {
                easing: "ease",
                duration: animationDuration,
            }
        );
    });
};
