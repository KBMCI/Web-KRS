import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";

const InputKelas = (props) => {
  const [getFiltered, setFiltered] = useState([]);
  const [test, setTest] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {
    kelasFiltered,
    setKelasFiltered,
    randomKrs,
    setRandomKrs,
    filteredClass,
    setFilteredClass,
  } = useContext(DataContext);
  const {
    type,
    namaKelas,
    namaMatkul,
    id,
    size,
    onChange,
    checked,
    label,
    value,
  } = props;

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

  // useEffect(() => {
  //   console.log(kelasFiltered);
  // }, [trigger]);

  return (
    <>
      <div className="flex flex-row-reverse justify-center items-center gap-1">
        <label className="font-semibold ">{namaKelas}</label>
        <input
          type="checkbox"
          checked={isChecked}
          className={`w-4 h-4 rounded-full duration-500 `}
          onChange={(event) => selectedClass(event, id)}
        />
      </div>
    </>
  );
};

export default InputKelas;
