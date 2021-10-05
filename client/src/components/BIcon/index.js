import "bootstrap-icons/font/bootstrap-icons.css";

export const BIcon = (props) => {
    return <i style={{ fontSize: props.size ?? "initial" }} className={`bi bi-${props.icon}`} />;
};
