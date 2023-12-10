import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../context/DataContext";

const MatkulCheckbox = (props) => {
  const { namaMatkul, id, AllMatkul } = props;
  const { selectedIdMatkul, setSelectedIdMatkul } = useContext(DataContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (selectedIdMatkul) {
      // Mengubah Object menjadi Array
      const ArraySelectedMatkul = selectedIdMatkul.map((item) => item?.ID);
      // Boolean untuk memastikan id ada di dalam ArraySelectedMatkul
      const isSelected = ArraySelectedMatkul.includes(id);
      setIsChecked(isSelected);
    } else if (localStorage.getItem("Temporary_plan")) {
      // Mengambil ID Matkul di Storage, agar tidak hilang saat di refresh
      const checkListMatkul = JSON.parse(
        localStorage.getItem("Temporary_plan")
      );
      // Mengubah Object menjadi Array
      const ArrayCheckListMatkul = checkListMatkul.map((item) => item?.ID);
      // Boolean untuk memastikan id ada di dalam ArrayCheckListMatkul
      const isSelected = ArrayCheckListMatkul.includes(id);
      setIsChecked(isSelected);
    } else {
      console.log("FALSE");
    }
  }, [, AllMatkul]);

  // Selected Matkul
  const selectedMatkul = (index, event) => {
    if (event.target.checked) {
      setIsChecked(true);

      if (selectedIdMatkul) {
        setSelectedIdMatkul([...selectedIdMatkul, { ID: index }]);
      } else {
        setSelectedIdMatkul([{ ID: index }]);
      }
    } else {
      setIsChecked(false);
      const filterSelectedId = selectedIdMatkul.filter((item) => {
        return item.ID !== index;
      });

      setSelectedIdMatkul(filterSelectedId);
    }
  };

  return (
    <>
      <input
        value={namaMatkul}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(event) => selectedMatkul(id, event)}
      />
    </>
  );
};

export default MatkulCheckbox;
