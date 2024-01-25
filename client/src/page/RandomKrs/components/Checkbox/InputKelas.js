import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../context/DataContext";

const InputKelas = (props) => {
  const [trigger, setTrigger] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { kelasFiltered, setKelasFiltered } = useContext(DataContext);
  const { namaKelas, namaMatkul, id } = props;

  const selectedClass = (event) => {
    // console.log(event.target.id);
    // console.log(id);
    if (event.target.checked) {
      // console.log("randomKrs");
      // console.log(`${namaMatkul}-${namaKelas}`);

      setKelasFiltered([...kelasFiltered, `${namaMatkul}-${namaKelas}`]);
      setTrigger(true);
      setIsChecked(true);
      // setRandomKrs(filtered);
    } else {
      const unfiltered = kelasFiltered.filter((item) => {
        return item !== `${namaMatkul}-${namaKelas}`;
      });
      setKelasFiltered(unfiltered);
      setTrigger(false);
      setIsChecked(false);
    }
    return console.log("done");
  };

  useEffect(() => {
    // setKelasFiltered(randomKrs);
    const hasBeenChecked = kelasFiltered.find((item) => {
      return item === `${namaMatkul}-${namaKelas}`;
    });

    if (hasBeenChecked) {
      setIsChecked(true);
    }
  }, []);

  return (
    <>
      <label className="flex flex-row justify-between items-center gap-1 cursor-pointer" htmlFor={id}>
        <p className="font-semibold ">Kelas {namaKelas}</p>
        <input
          type="checkbox"
          checked={isChecked}
          id={id}
          className={`w-4 h-4 rounded-full duration-500 `}
          onChange={(event) => selectedClass(event, id)}
        />
      </label>
    </>
  );
};

export default InputKelas;
