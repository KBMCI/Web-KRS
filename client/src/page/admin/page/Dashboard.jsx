import React, { useEffect, useState } from "react";
import Button from "../../../component/Button";
import Count from "../../../component/Count";
import PageLoading from "../../../component/loader/PageLoading";
import { getDataDashboardAdmin } from "../features/dashboard/services/getDataDahboardAdmin";

const Dashboard = () => {
  const token = window.localStorage.getItem("Authorization");
  const [dataDashboard, setDataDashboard] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  // getAllMatkul
  useEffect(() => {
    setLoadingTable(true);
    const getAllDataDashboardAdmin = async () => {
      try {
        const result = await getDataDashboardAdmin(token);

        if (result?.response?.data) {
          alert(result.response.data.message);
          setTimeout(() => {
            setLoadingTable(false);
          }, 1500);
          return;
        }
        setDataDashboard(() => result.data.data);
        setTimeout(() => {
          setLoadingTable(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDataDashboardAdmin();
  }, []);

  // Style
  const styleBox =
    "p-6 rounded-xl bg-primary h-44 w-1/5 shadow flex flex-col justify-between gap-2 drop-shadow-md";

  return (
    <div className="pt-10 px-10 w-full">
      <h1 className="text-4xl font-bold mb-12">Dashboard</h1>
      {!loadingTable ? (
        <div className="flex justify-center gap-6 w-full">
          <div className={`${styleBox}`}>
            <h1 className="font-bold text-2xl text-center mb-3 text-secondary">
              User Panel
            </h1>
            <div className="mb-3">
              <div className="mb-2 text-secondary">
                {<Count duration="1" number={dataDashboard.user} />}
              </div>
              <h1 className="text-center font-semibold text-secondary">
                Jumlah User
              </h1>
            </div>
            <div className="flex justify-center">
              <Button to={"/admin/user-panel"} name="User Panel" />
            </div>
          </div>
          <div className={`${styleBox}`}>
            <h1 className="font-bold text-2xl text-center mb-3 text-secondary">
              Mata Kuliah
            </h1>
            <div className="mb-3">
              <div className="mb-2 text-secondary">
                {<Count duration="1" number={dataDashboard.matkul} />}
              </div>
              <h1 className="text-center font-semibold  text-secondary">
                Jumlah Mata Kuliah
              </h1>
            </div>
            <div className="flex justify-center">
              <Button to={"/admin/mata-kuliah"} name="Mata Kuliah" />
            </div>
          </div>
          <div className={`${styleBox}`}>
            <h1 className="font-bold text-2xl text-center mb-3 text-secondary">
              Kelas
            </h1>
            <div className="mb-3">
              <div className="mb-2 text-secondary">
                {<Count duration="1" number={dataDashboard.kelas} />}
              </div>
              <h1 className="text-center font-semibold text-secondary">
                Jumlah Kelas
              </h1>
            </div>
            <div className="flex justify-center">
              <Button to={"/admin/kelas"} name="Kelas" />
            </div>
          </div>
          <div className={`${styleBox}`}>
            <h1 className="font-bold text-2xl text-center mb-3 text-secondary">
              Program Studi
            </h1>
            <div className="mb-3">
              <div className="mb-2 text-secondary">
                {<Count duration="1" number={dataDashboard.program_studi} />}
              </div>
              <h1 className="text-center font-semibold text-secondary">
                Jumlah Program Studi
              </h1>
            </div>
            <div className="flex justify-center">
              <Button to={"/admin/program-studi"} name="program_studi" />
            </div>
          </div>
          <div className={`${styleBox}`}>
            <h1 className="font-bold text-2xl text-center mb-3 text-secondary">
              Fakultas
            </h1>
            <div className="mb-3">
              <div className="mb-2 text-secondary">
                {<Count duration="1" number={dataDashboard.fakultas} />}
              </div>
              <h1 className="text-center font-semibold text-secondary">
                Jumlah Fakultas
              </h1>
            </div>
            <div className="flex justify-center">
              <Button to={"/admin/fakultas"} name="fakultas" />
            </div>
          </div>
        </div>
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default Dashboard;
