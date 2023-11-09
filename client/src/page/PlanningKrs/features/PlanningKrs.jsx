import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrompt } from "../../../hooks/usePrompt";
import TablePlanningEdit from "../components/table/TablePlanningEdit";
import TablePlanningResult from "../components/table/TablePlanningResult";
import timeToDecimal from "../lib/timeToDecimal";
import { patchMyPlan, postMyPlan } from "../services/myPlan";
import { suggestion } from "../services/suggestion";
import { userHasMatkul } from "../services/userHasMatkul";

const PlanningKrs = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [matkulSelected, setMatkulSelected] = useState([]);
  const { state } = useLocation();
  const idPlan = state ? state.id : null;
  const token = window.localStorage.getItem("Authorization");

  const [isSave, setIsSave] = useState(false);
  const [loading, setLoading] = useState({
    saveUpdateMyPlan: false,
    suggestion: false,
  });

  // Method untuk menambahkan dan mengatur status
  const setStatus = useCallback(
    (data) => {
      const dataTemp = data;
      let check = true;
      if (state) {
        dataTemp.forEach((matkuls, indexMatkul) => {
          matkuls.kelas.forEach((kelas, indexKelas) => {
            check = state.data?.includes(kelas.id);
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

  // useEffect untuk mengambil data userHasMatkul
  useEffect(() => {
    const getUserHasMatkul = async () => {
      try {
        const result = await userHasMatkul(token);

        if (result?.response?.data) {
          alert(result.response.data.message);
        }

        setStatus(result.data.data.matkuls);
      } catch (err) {
        console.log(err);
      }
    };
    getUserHasMatkul();
  }, [setStatus]);

  // useEffect untuk mengubah dengan status 1 pada data
  useEffect(() => {
    const arrTemp = [];
    data.forEach((matkul) => {
      matkul.kelas.forEach((kelas) => {
        if (kelas.status === 1) {
          arrTemp.push(kelas.id);
        }
      });
    });
    setMatkulSelected(arrTemp);
  }, [data, trigger]);

  const postSave = async () => {
    if (matkulSelected.length < data.length) {
      return alert("Matkul yang di pilih kurang");
    }
    setLoading((prev) => ({
      ...prev,
      saveUpdateMyPlan: true,
    }));
    try {
      const result = await postMyPlan(token, matkulSelected);

      if (result?.response?.data) {
        alert(result.response.data.message);
        setLoading((prev) => ({
          ...prev,
          saveUpdateMyPlan: false,
        }));
      }
      alert(result.data.message);
      setLoading((prev) => ({
        ...prev,
        saveUpdateMyPlan: false,
      }));
      setIsSave(true);
      setMatkulSelected([]);
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
    }
  };

  // Add Another Plan
  const addAnotherPlan = () => {
    const confirm = window.confirm("Ini bakalan tidak disave");
    if (confirm) {
      resetStatus();
    }
  };

  // Reset All status kelas 0
  const resetStatus = () => {
    let dataTemp = data;
    data.forEach((matkul, indexMatkul) => {
      matkul.kelas.forEach((kelas, indexKelas) => {
        const update = { ...kelas, status: 0 };
        dataTemp[indexMatkul].kelas[indexKelas] = update;
      });
    });
    setData(() => dataTemp);
    setTrigger((prev) => !prev);
  };

  // Suggestion
  const [lockMatkul, setLockMatkul] = useState({
    showSuggest: false,
    idMatkulLock: [],
    historyMatkul: [],
    fetchSuggest: false,
  });

  const lockMatkulPlanning = () => {
    if (lockMatkul.showSuggest) {
      setLockMatkul((prev) => ({
        ...prev,
        showSuggest: false,
        fetchSuggest: false,
      }));
      return;
    }

    setLockMatkul((prev) => ({
      ...prev,
      showSuggest: true,
      idMatkulLock: matkulSelected,
    }));
  };

  const postSuggest = async () => {
    if (lockMatkul.fetchSuggest === true) {
      console.log();
      setSugget(lockMatkul.historyMatkul);
      return;
    }

    setLoading((prev) => ({
      ...prev,
      suggestion: true,
    }));
    try {
      const result = await suggestion(token, lockMatkul.idMatkulLock);

      if (result?.response?.data) {
        alert(result.response.data.message);
        setLoading((prev) => ({
          ...prev,
          suggestion: false,
        }));
      }

      setTimeout(() => {
        setLoading((prev) => ({
          ...prev,
          suggestion: false,
        }));
        setSugget(result.data.data);
        setLockMatkul((prev) => ({
          ...prev,
          fetchSuggest: true,
          historyMatkul: result.data.data,
        }));
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const setSugget = (res) => {
    if (res.length === 0) {
      alert("Tidak ada suggestion");
      return;
    }

    const randomNumber = Math.floor(Math.random() * res.length - 1) + 1;

    const sug = res[randomNumber];

    data.forEach((matkul) => {
      matkul.kelas.forEach((kls) => {
        sug.forEach((kelas) => {
          if (kls.id === kelas.id_kelas) {
            statusHandlerTrue(matkul.id, kelas.id, kelas.jadwal_kelas);
          }
        });
      });
    });
  };

  // Untuk Menampilkan confirm ketika berpindah route
  function showConfirModal() {
    if (matkulSelected.length > 0) {
      return true;
    }
    return false;
  }

  // Untuk mengupdate
  const updatePlan = async () => {
    if (matkulSelected.length < data.length) {
      return alert("Matkul yang di pilih kurang");
    }
    setLoading((prev) => ({
      ...prev,
      saveUpdateMyPlan: true,
    }));
    try {
      const result = await patchMyPlan(token, matkulSelected, idPlan);

      if (result?.response?.data) {
        alert(result.response.data.message);
        setLoading((prev) => ({
          ...prev,
          saveUpdateMyPlan: false,
        }));
      }

      alert(result.data.message);
      setLoading((prev) => ({
        ...prev,
        saveUpdateMyPlan: false,
      }));
      setIsSave(true);
      setMatkulSelected([]);
    } catch (e) {
      console.log(e);
    }
  };

  const statusHandlerTrue = (id_matkul, id_kelas, jadwal_kelas) => {
    let dataTemp = data;
    data.forEach((matkul, indexMatkul) => {
      matkul.kelas.forEach((kelas, indexKelas) => {
        if (matkul.id === id_matkul) {
          if (kelas.id === id_kelas) {
            let update = { ...kelas, status: 1 };
            dataTemp[indexMatkul].kelas[indexKelas] = update;
          } else {
            let update = { ...kelas, status: -1 };
            dataTemp[indexMatkul].kelas[indexKelas] = update;
          }
        }
        kelas.jadwal_kelas.forEach((jk) => {
          jadwal_kelas.forEach((j) => {
            if (j.id === jk.id) {
              let update = { ...kelas, status: 1 };
              dataTemp[indexMatkul].kelas[indexKelas] = update;
            } else if (
              (j.hari === jk.hari &&
                j.jam_mulai === jk.jam_mulai &&
                j.jam_selesai === jk.jam_selesai) ||
              (j.hari === jk.hari &&
                timeToDecimal(j.jam_mulai) >= timeToDecimal(jk.jam_mulai) &&
                timeToDecimal(j.jam_mulai) < timeToDecimal(jk.jam_selesai)) ||
              (j.hari === jk.hari &&
                timeToDecimal(j.jam_mulai) <= timeToDecimal(jk.jam_mulai) &&
                timeToDecimal(j.jam_selesai) > timeToDecimal(jk.jam_mulai))
            ) {
              let update = { ...kelas, status: -1 };
              dataTemp[indexMatkul].kelas[indexKelas] = update;
            } // Menambahkan jika jam mata kuliah
          });
        });
      });
    });
    setData(dataTemp);
    setTrigger(!trigger);
  };

  usePrompt("Ini tidak akan disave", showConfirModal());
  return (
    <>
      <div className="min-h-[448px] bg-secondary px-7 pb-7 pt-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Planning KRS</h1>
        <div>
          <div className="flex gap-4">
            <div>
              <h2 className="text-xl font-medium mb-2">Custom KRS</h2>
              <TablePlanningEdit
                matkuls={data}
                setData={setData}
                setTrigger={setTrigger}
                trigger={trigger}
                statusHandlerTrue={statusHandlerTrue}
              />
            </div>
            <div>
              <h2 className="text-xl font-medium mb-2">My Current Plan</h2>
              <TablePlanningResult matkuls={data} trigger={trigger} />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <button
              className="p-2 bg-accent text-neutral-900 rounded-md font-semibold "
              onClick={addAnotherPlan}
            >
              <h1>+ Add Another Plan</h1>
            </button>
          </div>
          {isSave ? (
            <div className="flex flex-col items-end justify-end gap-2">
              <div className="flex justify-center items-center flex-row bg-neutral-200 w-[150px] h-[50px] gap-2 rounded-[10px] font-bold">
                <p className="text-neutral-400">Plan Added</p>
              </div>
              <div>
                To see your saved plan, go to &nbsp;
                <span className="text-primary hover:underline hover:duration-500">
                  <Link to="/myplan">My Plan</Link>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <div className="flex gap-2 items-center">
                <div
                  className="rounded-full p-4 bg-primary flex justify-center items-center w-6 h-6 cursor-pointer "
                  onClick={lockMatkulPlanning}
                >
                  {!lockMatkul.showSuggest ? "🔓" : "🔒"}
                </div>
                <button
                  className={`p-2 rounded-md font-semibold ${
                    !lockMatkul.showSuggest
                      ? "bg-neutral-200 text-neutral-400"
                      : "bg-accent "
                  }`}
                  onClick={() => postSuggest()}
                  disabled={
                    !lockMatkul.showSuggest
                      ? true
                      : !loading.suggestion
                      ? false
                      : true
                  }
                >
                  {!loading.suggestion ? "Suggestion" : "Loading..."}
                </button>
              </div>
              <button
                className="p-2 bg-accent text-neutral-900 rounded-md font-semibold "
                onClick={idPlan ? () => updatePlan() : () => postSave()}
                disabled={loading.saveUpdateMyPlan}
              >
                {!loading.saveUpdateMyPlan
                  ? idPlan
                    ? "Update"
                    : "Save"
                  : "Loading.."}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlanningKrs;
