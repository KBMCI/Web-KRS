import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { url } from "../../api/url";
import TablePlanning from "./TablePlanning";

const PlanningKrs = () => {
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const id_plan = state ? state.id : null;
  // Method Planning untuk menambahkan status
  const planning = useCallback(
    (data) => {
      const dataTemp = data;
      let check = true;
      if (state) {
        dataTemp.forEach((matkuls, indexMatkul) => {
          matkuls.kelas.forEach((kelas, indexKelas) => {
            check = state.data?.includes(kelas.ID);
            if (check) {
              let update = { ...kelas, status: 1 };
              dataTemp[indexMatkul].kelas[indexKelas] = update;
            } else {
              let update = { ...kelas, status: -1 };
              dataTemp[indexMatkul].kelas[indexKelas] = update;
            }
          });
        });
      } else {
        dataTemp.forEach((matkuls, indexMatkul) => {
          matkuls.kelas.forEach((kelas, indexKelas) => {
            let update = { ...kelas, status: 0 };
            dataTemp[indexMatkul].kelas[indexKelas] = update;
          });
        });
      }
      setData(dataTemp);
    },
    [state]
  );

  useEffect(() => {
    const getUserHasMatkul = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("Mengambil data user has matkul");
        const res = await url.get("/user/matkul", config);
        console.log(res.data.data.matkuls);
        if (res.data.message) {
          planning(res.data.data.matkuls);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserHasMatkul();
  }, [planning]);

  return (
    <>{<TablePlanning data={data} setData={setData} idPlan={id_plan} />}</>
  );
};

export default PlanningKrs;
