import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../context/DataContext";

const InputJam = (props) => {
  const { type, name, id, size, value, day, time } = props;
  const { waktuFiltered, setWaktuFiltered } = useContext(DataContext);
  const [isChecked, setIsChecked] = useState(false);
  const [idTarget, setIsTarget] = useState();
  const waktuFilter = `${day}-${time}`;

  const selectedTime = (event) => {
    if (event.target.checked) {
      setWaktuFiltered([...waktuFiltered, `${day}-${time}`]);
      setIsChecked(true);
    } else {
      const notFiltered = waktuFiltered.filter((item) => {
        return item !== waktuFilter;
      });
      setIsChecked(false);
      setWaktuFiltered(notFiltered);
    }
  };

  useEffect(() => {
    const hasBeenChecked = waktuFiltered.find((item) => {
      return item === waktuFilter;
    });
    if (hasBeenChecked) {
      setIsChecked(true);
    }
    // console.log(waktuFiltered);
    // console.log(id);
  }, [, isChecked]);

  return (
    <>
      <input
        type="checkbox"
        checked={isChecked}
        className="w-4 h-4  duration-500 "
        onChange={(event) => selectedTime(event)}
      />
    </>
  );
};

export default InputJam;
