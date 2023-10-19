import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../api/url";
import { usePrompt } from "../../hooks/usePrompt";
import BtnPlanning from "./BtnPlanning";
import TableResultPlanning from "./TableResultPlanning";
import { createTable } from "./TableTemp";

function timeToDecimal(t) {
  var arr = t.split(":");
  var dec = parseInt((arr[1] / 6) * 10, 10);

  return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
}

const TablePlanning = ({ data: matkuls, setData, idPlan }) => {
  const table = createTable();
  const [tabelJadwal, setTabelJadwal] = useState();
  const [trigger, setTrigger] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const setTabel = useCallback(
    (waktu, hari, kelas, matkul, id_matkul, id_kelas, status, jadwal_kelas) => {
      // Filter tabel jadwal yang sesuai dengan waktu
      const tabelResult = table.filter((tabel) => tabel.jam === waktu);

      // Mengecek tabel waktu tidak berisi array kosong
      if (tabelResult.length === 0) return;

      // Mengambil Object pada array[0] tabel result
      const [results] = tabelResult;

      // Data Hari
      let days = results.hari;

      // Kumpulan data yang dimasukan dalam array
      const datas = {
        id_matkul,
        id_kelas,
        matkul,
        kelas,
        status,
        jadwal_kelas,
      };

      let tabel = [];
      // Looping result
      Object.keys(days).forEach((result) => {
        // return jika hari tidak sama
        if (result !== hari) return;

        // Mengecek apakah data telah ada
        const check = days[result].find(
          (obj) =>
            obj.id_matkul === datas.id_matkul &&
            obj.id_kelas === datas.id_kelas &&
            obj.matkul === datas.matkul &&
            obj.kelas === datas.kelas
        );

        if (check) {
          return;
        }

        // Memasukan data pada array hari
        days[result] = [...days[result], datas];

        const tempTabel = table;
        tempTabel.forEach((item, index) => {
          if (item.jam === results.jam) tempTabel[index] = item;
        });
        tabel = tempTabel;
      });
      setTabelJadwal(tabel);
    },
    [trigger]
  );

  useEffect(() => {
    matkuls.forEach((matkul) => {
      matkul.kelas.forEach((kelas) => {
        kelas.jadwal_kelas.forEach((jadwal_kelas) => {
          // Memasukan data pada tabel
          setTabel(
            `${jadwal_kelas.jam_mulai} - ${jadwal_kelas.jam_selesai}`,
            jadwal_kelas.hari.toLowerCase(),
            kelas.nama,
            matkul.nama,
            matkul.ID,
            kelas.ID,
            kelas.status,
            kelas.jadwal_kelas
          );
        });
      });
    });
  }, [matkuls, setTabel, trigger]);

  const barisTabel = () => {
    return "text-center px-2 font-semibold text-[12px]";
  };

  const jamTabel = () => {
    return "py-2 px-4 text-center font-bold text-[12px]";
  };

  const headerTabel = () => {
    return "px-4 py-2 text-[14px]";
  };

  const statusHandlerTrue = (id_matkul, id_kelas, jadwal_kelas) => {
    let dataTemp = matkuls;
    matkuls.forEach((matkul, indexMatkul) => {
      matkul.kelas.forEach((kelas, indexKelas) => {
        if (matkul.ID === id_matkul) {
          if (kelas.ID === id_kelas) {
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

  const statusHandlerFalse = ({ id_matkul, jadwal_kelas, id_kelas }) => {
    let dataTemp = matkuls;
    matkuls.forEach((matkul, indexMatkul) => {
      matkul.kelas.forEach((kelas, indexKelas) => {
        if (matkul.ID === id_matkul) {
          if (kelas.ID === id_kelas) {
            // Jika kelas Sama
            const update = { ...kelas, status: 0 };
            dataTemp[indexMatkul].kelas[indexKelas] = update;
          } else {
            const update = setStatusSameMatkul(kelas, matkul.ID);
            dataTemp[indexMatkul].kelas[indexKelas] = update;
          }
        } else {
          console.log(`Id matkul beda`);
          kelas.jadwal_kelas.forEach((jk, indexJk) => {
            jadwal_kelas.forEach((j, indexJ) => {
              if (
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
                console.log(
                  `masuk jadwal yang sama ${jk.jam_mulai} - ${jk.jam_selesai}`
                );
                // let update = { ...kelas, status: 0 };
                // Bug harus ada kondisi jika matkul di ID yang sama dipilih maka tetap -1
                let update = setStatusDiffMatkul(kelas, matkul.ID);
                dataTemp[indexMatkul].kelas[indexKelas] = update;
              }
            });
          });
        }
      });
    });
    setData(dataTemp);
    setTrigger(!trigger);
  };

  const setStatusSameMatkul = (kls, idM) => {
    let update = {};
    let change = true;

    matkuls.forEach((matkul) => {
      matkul.kelas.forEach((kelas) => {
        kelas.jadwal_kelas.forEach((jk) => {
          kls.jadwal_kelas.forEach((j) => {
            if (
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
              if (
                kelas.ID !== kls.ID &&
                kelas.status === 1 &&
                matkul.ID !== idM
              ) {
                change = false;
              }
            }
          });
        });
      });
    });
    if (change) {
      update = { ...kls, status: 0 };
    } else {
      update = { ...kls, status: -1 };
    }
    return update;
  };

  const setStatusDiffMatkul = (kls, idM) => {
    let update = {};
    let change = true;

    matkuls.forEach((matkul) => {
      if (matkul.ID === idM) {
        matkul.kelas.forEach((kelas) => {
          if (kelas.ID !== kls.ID && kelas.status === 1) {
            change = false;
          }
        });
      }
    });
    if (change) {
      update = { ...kls, status: 0 };
    } else {
      update = { ...kls, status: -1 };
    }
    return update;
  };

  // Menyimpan matkul dengan status 1
  const [arrStatus1, setArrStatus1] = useState([]);

  useEffect(() => {
    const arrTemp = [];
    matkuls.forEach((matkul) => {
      matkul.kelas.forEach((kelas) => {
        if (kelas.status === 1) {
          arrTemp.push(kelas.ID);
        }
      });
    });
    setArrStatus1(arrTemp);
  }, [matkuls, trigger]);

  const postSave = async () => {
    if (arrStatus1.length < matkuls.length) {
      return alert("Matkul yang di pilih kurang");
    }
    try {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await url.post(
        "/my-plan",
        {
          id_kelas: arrStatus1,
        },
        config
      );
      alert(res.data.message);
      setIsSave(true);
      setArrStatus1([]);
    } catch (err) {
      alert(err);
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
    let dataTemp = matkuls;
    matkuls.forEach((matkul, indexMatkul) => {
      matkul.kelas.forEach((kelas, indexKelas) => {
        const update = { ...kelas, status: 0 };
        dataTemp[indexMatkul].kelas[indexKelas] = update;
      });
    });
    setData(dataTemp);
    setTrigger(!trigger);
  };

  // Suggestion
  const postSuggest = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await url.post(
        "/planning-krs",
        {
          id_kelas: arrStatus1,
        },
        config
      );
      setSugget(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const setSugget = (res) => {
    if (res.length === 0) {
      alert("Tidak ada suggestion");
      return;
    }
    const sug = res[0];
    matkuls.forEach((matkul) => {
      matkul.kelas.forEach((kls) => {
        sug.forEach((kelas) => {
          if (kls.ID === kelas.id_kelas) {
            statusHandlerTrue(matkul.ID, kelas.ID, kelas.jadwal_kelas);
          }
        });
      });
    });
  };

  // Untuk Menampilkan confirm ketika berpindah route
  function showConfirModal() {
    if (arrStatus1.length > 0) {
      return true;
    }
    return false;
  }

  // Untuk mengupdate
  const updatePlan = async () => {
    if (arrStatus1.length < matkuls.length) {
      return alert("Matkul yang di pilih kurang");
    }
    try {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await url.patch(
        `/my-plan/${idPlan}`,
        {
          id_kelas: arrStatus1,
        },
        config
      );
      alert(res.data.message);
      setIsSave(true);
      setArrStatus1([]);
    } catch (e) {
      console.log(e);
    }
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
              <div className="overflow-y-scroll h-screen">
                <table className="table-fixed w-full border-collapse border-b border-neutral-400 drop-shadow-2xl rounded-2xl overflow-hidden basis-1/2">
                  <thead>
                    <tr className="bg-primary text-secondary">
                      <th className={headerTabel()}></th>
                      <th className={headerTabel()}>Senin</th>
                      <th className={headerTabel()}>Selasa</th>
                      <th className={headerTabel()}>Rabu</th>
                      <th className={headerTabel()}>Kamis</th>
                      <th className={headerTabel()}>Jumat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabelJadwal?.map((jadwal, index) => (
                      <tr
                        key={index}
                        className="bg-secondary text-neutral-900 border-b border-neutral-400"
                      >
                        <td className={jamTabel()}>{jadwal.jam}</td>
                        <td className={barisTabel()}>
                          {jadwal.hari.senin?.map((value, index) => (
                            <div key={index}>
                              <BtnPlanning
                                value={value}
                                statusHandlerTrue={statusHandlerTrue}
                                statusHandlerfalse={statusHandlerFalse}
                              />
                            </div>
                          ))}
                        </td>
                        <td className={barisTabel()}>
                          {jadwal.hari.selasa?.map((value, index) => (
                            <div key={index}>
                              <BtnPlanning
                                value={value}
                                statusHandlerTrue={statusHandlerTrue}
                                statusHandlerfalse={statusHandlerFalse}
                              />
                            </div>
                          ))}
                        </td>
                        <td className={barisTabel()}>
                          {jadwal.hari.rabu?.map((value, index) => (
                            <div key={index}>
                              <BtnPlanning
                                value={value}
                                statusHandlerTrue={statusHandlerTrue}
                                statusHandlerfalse={statusHandlerFalse}
                              />
                            </div>
                          ))}
                        </td>
                        <td className={barisTabel()}>
                          {jadwal.hari.kamis?.map((value, index) => (
                            <div key={index}>
                              <BtnPlanning
                                value={value}
                                statusHandlerTrue={statusHandlerTrue}
                                statusHandlerfalse={statusHandlerFalse}
                              />
                            </div>
                          ))}
                        </td>
                        <td className={barisTabel()}>
                          {jadwal.hari.jumat?.map((value, index) => (
                            <div key={index}>
                              <BtnPlanning
                                value={value}
                                statusHandlerTrue={statusHandlerTrue}
                                statusHandlerfalse={statusHandlerFalse}
                              />
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <TableResultPlanning data={matkuls} trigger={trigger} />
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
            <div className="flex gap-5">
              <button
                className="p-2 bg-accent text-neutral-900 rounded-md font-semibold "
                onClick={() => postSuggest(arrStatus1)}
              >
                <h1>Suggestion</h1>
              </button>
              <button
                className="p-2 bg-accent text-neutral-900 rounded-md font-semibold "
                onClick={idPlan ? () => updatePlan() : () => postSave()}
              >
                <h1>{idPlan ? "Update" : "Save"}</h1>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TablePlanning;
