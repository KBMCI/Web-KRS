import InputJam from "../page/RandomKrs/components/Checkbox/InputJam";
import InputKelas from "../page/RandomKrs/components/Checkbox/InputKelas";

const Checkbox = ({
  namaKelas,
  namaMatkul,
  id,
  size,
  value,
  onChange,
  checked,
  label,
  day,
  time,
}) => {
  // console.log(namaKelas);
  // if (label === "circle") console.log(value);

  return (
    <div>
      {label === "circle" ? (
        <InputKelas
          namaKelas={namaKelas}
          namaMatkul={namaMatkul}
          id={id}
          size={size}
          onChange={onChange}
          checked={checked}
          value={value}
          className={label}
        />
      ) : (
        <InputJam
          type="checkbox"
          name={namaKelas}
          id={id}
          size={size}
          onChange={onChange}
          checked={checked}
          value={value}
          day={day}
          time={time}
          className={`${label === "circle" && "rounded-full"} w-4 h-4`}
        />
      )}
    </div>
  );
};

export default Checkbox;
