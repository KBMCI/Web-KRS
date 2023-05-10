const Checkbox = ({ name, id, size, value, onChange, checked, label }) => {
  return (
    <div>
      <input
        type="checkbox"
        name={name}
        id={id}
        size={size}
        onChange={onChange}
        checked={checked}
        value={value}
        className={`${label === "circle" && "rounded-full"} w-4 h-4`}
      />
    </div>
  );
};

export default Checkbox;
