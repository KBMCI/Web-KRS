import { Icon } from "@iconify/react";
import Eyes_close from "../../../assets/Eyes_close.svg";
import Eyes_open from "../../../assets/Eyes_open.svg";

const Input = ({
  type,
  id,
  name,
  value,
  placeholder,
  onChange,
  className,
  required,
  icon,
  password,
  setType,
}) => {
  const iconStyle = (name) => {
    return ` ${
      required && !name
        ? "text-error invalid:border-error focus:invalid:border-error focus:invalid:ring-error"
        : name
        ? `text-primary `
        : `text-neutral-400 `
    } absolute top-1 right-4 translate-y-3`;
  };

  const handleType = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        onChange={onChange}
        className={` ${
          required
            ? `border invalid:border-error 
          focus:invalid:border-error 
          focus:invalid:ring-error`
            : ``
        } rounded-xl shadow-lg w-full py-4 pl-4 peer border-none focus:border-primary ${className}`}
      />
      {!password ? (
        <Icon icon={icon} width={24} className={iconStyle(value)} />
      ) : value ? (
        <div onClick={handleType} className="absolute right-[18px] top-4">
          <img
            src={type === "password" ? Eyes_close : Eyes_open}
            alt="icon eye"
            width="24"
          />
        </div>
      ) : (
        <Icon
          icon="material-symbols:lock-outline"
          width="24"
          className={iconStyle(value)}
        />
      )}
    </div>
  );
};

export default Input;
