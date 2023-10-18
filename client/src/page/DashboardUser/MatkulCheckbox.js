import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { PlanContext } from "../../context/PlanContext";

const MatkulCheckbox = (props) => {
  const { namaMatkul, id, index, AllMatkul } = props;
  const { selectedIdMatkul, setSelectedIdMatkul } = useContext(DataContext);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const { planContext, setPlanContext } = useContext(PlanContext);

  useEffect(() => {
    // Cek apakah ID saat ini ada dalam selectedIdMatkul
    // console.log(planContext);
    // console.log(selectedIdMatkul);
    // console.log(
    //   "ID Matkul Asli " +
    //     id +
    //     " = " +
    //     (index + 1) +
    //     " Nama Matkul: " +
    //     namaMatkul
    // );
    // console.log(selectedIdMatkul);

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
    // mengubah Object menjadi Array
    // const idMatkul = selectedIdMatkul.map((item) => item?.ID);
    // const isSelected = idMatkul.includes(id);
    // console.log(idMatkul);
    // console.log(isSelected);

    // Atur status checkbox berdasarkan hasil seleksi
  }, [, AllMatkul]);
  const selectedMatkul = (index, event) => {
    console.log(event.target.id);
    console.log(event);
    if (event.target.checked) {
      setIsChecked(true);
      console.log("Yeay you've checked this " + index);
      console.log(selectedIdMatkul);
      if (selectedIdMatkul) {
        setSelectedIdMatkul([...selectedIdMatkul, { ID: index }]);
      } else {
        setSelectedIdMatkul([{ ID: index }]);
      }
    } else {
      console.log("Oh, very sad for this " + index);
      setIsChecked(false);
      const filterSelectedId = selectedIdMatkul.filter((item) => {
        return item.ID !== index;
      });
      // console.log(filterSelectedId);
      setSelectedIdMatkul(filterSelectedId);
    }

    return console.log(selectedIdMatkul);
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
