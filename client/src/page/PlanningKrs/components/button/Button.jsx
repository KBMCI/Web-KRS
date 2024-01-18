import { useEffect, useState } from "react";

const Button = ({
  value,
  statusHandlerTrue,
  statusHandlerfalse
}) => {
  const [pilih, setPilih] = useState("");

  const selected = () => {
    return "px-1 py-2 bg-primary/10 border border-primary border-2 text-neutral-900 border-primary rounded-lg bg-primary ";
  };
  const disable = () => {
    return "px-1 py-2 text-neutral-400 border border-1 border-neutral-400 rounded-lg";
  };
  const active = () => {
    return "px-1 py-2 rounded-lg border border-1 text-neutral-900 border-neutral-900 ";
  };

  useEffect(() => {
    if (value.status === 1) {
      setPilih(selected());
    } else if (value.status === -1) {
      setPilih(disable());
    } else {
      setPilih(active());
    }
  }, [value.status]);

  const handleClick = () => {
    if (value.status === 1) {
      console.log("Menjalankan handler false");
      statusHandlerfalse(value);
    } else {
      console.log("Menjalankan handler true");
      statusHandlerTrue(value.id_matkul, value.id_kelas, value.jadwal_kelas);
    }
  };

  return (
    <button
      disabled={value.status === -1 && true}
      className={pilih}
      onClick={handleClick}
    >
      <h1 className="text-[10px]">
        {value.matkul} {value.kelas}
      </h1>
    </button>
  );
};

export default Button;