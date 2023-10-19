import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <Link to={props.to} onClick={props.onClick}>
      <button
        disabled={props.disabled}
        className={` ${props.disabled ? `bg-neutral-400` : `bg-accent `} ${
          props.fixed ? `fixed z-10  top-[130px] right-28` : ``
        } text-neutral-900 font-bold px-5 py-3 rounded-xl flex items-center gap-2`}
      >
        {" "}
        {props.icon}
        {props.name}
      </button>
    </Link>
  );
}