import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";

import CardPlanning from "./components/card/CardPlanning";
import CardRandomKrs from "./components/card/CardRandomKrs";
import CardSelectMatkul from "./components/card/CardSelectMatkul";
import CardMyPlan from "./components/card/cardMyPlan";
import { getDataDashboard } from "./services/getDataDashboard";
import { getIDMatkuls } from "./services/getIDMatkuls";
import { getMyPlan } from "./services/getMyPlan";
import postUserMatkul from "./services/postUserMatkul";

const DashboardUser = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [firstPlan, setFirstPlan] = useState([]);
  const [namaMataKuliahTabel, setNamaMataKuliahTabel] = useState([]);

  const { selectedIdMatkul, setSelectedIdMatkul } = useContext(DataContext);
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    // Get All Description of Matkul's
    const getNamaMataKuliah = async () => {
      try {
        const response = await getDataDashboard(token);
        setNamaMataKuliahTabel(response.data.data.ProgramStudi.prodi_matkul);
      } catch (err) {
        console.log(err);
      }
    };
    getNamaMataKuliah();

    // Get one Plan from User
    const getMyplans = async () => {
      try {
        const response = await getMyPlan(token, setIsFilled);

        setFirstPlan(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyplans();
  }, []);

  useEffect(() => {
    // Get the ID of the selected Matkuls by the user.
    const getIDMatkul = async () => {
      const response = await getIDMatkuls(token);

      setSelectedIdMatkul(response);
    };
    getIDMatkul();
  }, [, setSelectedIdMatkul]);

  // Click Button Save (Simpan)
  const onPostHandle = async () => {
    try {
      const response = await postUserMatkul(token, selectedIdMatkul);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-secondary p-7">
      <div className=" grid grid-cols-6 gap-3">
        {/* Tabel Mata Kuliah */}
        <CardSelectMatkul
          onPostHandle={onPostHandle}
          namaMataKuliahTabel={namaMataKuliahTabel}
        />
        {/* Card Planning  */}
        <CardPlanning />
        {/* Tabel My Plan */}
        <CardMyPlan firstPlan={firstPlan} isFilled={isFilled} />

        {/* Card Random KRS */}
        <CardRandomKrs />
      </div>
    </div>
  );
};

export default DashboardUser;
