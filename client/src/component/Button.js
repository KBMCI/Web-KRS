import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <Link to={props.to} onClick={props.onClick}>
      <button className="bg-primary text-secondary px-5 py-3 rounded-xl flex items-center gap-2">
        {" "}
        {props.icon}
        {props.name}
      </button>
    </Link>
  );
}
