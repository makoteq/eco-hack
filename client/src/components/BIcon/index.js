import "bootstrap-icons/font/bootstrap-icons.css";

export const BIcon = (props) => {
    return <i style={{ fontSize: props.size, color: props.color }} className={`bi bi-${props.icon}`} />;
};
