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
import Message from "../PlanningKrs/components/message/Message";

const DashboardUser = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [firstPlan, setFirstPlan] = useState([]);
  const [namaMataKuliahTabel, setNamaMataKuliahTabel] = useState([]);

  const { selectedIdMatkul, setSelectedIdMatkul } = useContext(DataContext);
  const token = localStorage.getItem("Authorization");

  const [notif, setNotif] = useState({
    open: false,
    status: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState({
    namaMatkul: true,
    myPlan: true,
  });

  useEffect(() => {
    // Get All Description of Matkul's
    const getNamaMataKuliah = async () => {
      setLoadingPage((prev) => ({ ...prev, namaMatkul: true }));
      try {
        const result = await getDataDashboard(token);
        if (result?.response?.data) {
          console.log(result);
          setTimeout(() => {
            setLoadingPage((prev) => ({ ...prev, namaMatkul: false }));
          }, 1000);
        }

        setNamaMataKuliahTabel(result.data.data.ProgramStudi.prodi_matkul);
        setTimeout(() => {
          setLoadingPage((prev) => ({ ...prev, namaMatkul: false }));
        }, 1000);
      } catch (err) {
        console.log(err);
        setLoadingPage((prev) => ({ ...prev, namaMatkul: false }));
      }
    };
    getNamaMataKuliah();

    // Get one Plan from User
    const getMyplans = async () => {
      setLoadingPage((prev) => ({ ...prev, myPlan: true }));
      try {
        const result = await getMyPlan(token, setIsFilled);
        if (result?.response?.data) {
          console.log(result);
          setTimeout(() => {
            setLoadingPage((prev) => ({ ...prev, myPlan: false }));
          }, 1000);
        }

        setFirstPlan(result.data.data);
        setTimeout(() => {
          setLoadingPage((prev) => ({ ...prev, myPlan: false }));
        }, 1000);
      } catch (err) {
        console.log(err);
        setLoadingPage((prev) => ({ ...prev, myPlan: false }));
      }
    };
    getMyplans();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Get the ID of the selected Matkuls by the user.
    const getIDMatkul = async () => {
      const response = await getIDMatkuls(token);

      setSelectedIdMatkul(response);
    };
    getIDMatkul();
  }, [setSelectedIdMatkul]);

  // Click Button Save (Simpan)
  const onPostHandle = async () => {
    setLoading(() => true);
    try {
      const result = await postUserMatkul(token, selectedIdMatkul);

      if (result?.response?.data) {
        setNotif(() => ({
          open: true,
          status: false,
          message: result.response.data.message,
        }));

        setTimeout(() => {
          setLoading(() => false);
          setNotif((prev) => ({
            ...prev,
            open: false,
          }));
        }, 2000);

        return;
      }

      setNotif(() => ({
        open: true,
        status: true,
        message: result.data.message,
      }));

      setTimeout(() => {
        setLoading(() => false);
        setNotif((prev) => ({
          ...prev,
          open: false,
        }));
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-secondary p-7 flex flex-col gap-3">
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <h1 className="font-semibold text-2xl py-1">Mata Kuliah dipilih</h1>
          {loadingPage.namaMatkul ? (
            <div className="h-[22rem] flex flex-col items-center drop-shadow-2xl animate-pulse bg-neutral-400 rounded-xl"></div>
          ) : (
            <CardSelectMatkul
              onPostHandle={onPostHandle}
              namaMataKuliahTabel={namaMataKuliahTabel}
              loading={loading}
            />
          )}
        </div>
        <div className="pt-10 w-[30%]">
          <CardPlanning />
        </div>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <h1 className="font-semibold text-2xl py-1">My Plans</h1>
          {loadingPage.myPlan ? (
            <div className="h-[22rem] flex flex-col items-center drop-shadow-2xl animate-pulse bg-neutral-400 rounded-xl"></div>
          ) : (
            <CardMyPlan firstPlan={firstPlan} isFilled={isFilled} />
          )}
        </div>
        <div className="pt-10 w-[30%]">
          <CardRandomKrs />
        </div>
      </div>
      <Message
        open={notif.open}
        statusMsg={notif.status}
        textMsg={notif.message}
      />
    </div>
  );
};

export default DashboardUser;
