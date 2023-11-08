import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../api/url";
import LogoJam from "../assets/LogoJam.svg";
import success from "../assets/success.svg";
import Button from "./Button";
import { header } from "./TableHeader";

const TablePlan = ({
  data,
  plan,
  currentPage,
  is_saved,
  deleteHandler,
  myPlan,
  idDelete,
  dashboardUser,
  postPerPage,
  isDisabled,
  idPlan,
}) => {
  // menetapkan agar header tidak akan berubah
  Object.freeze(header);
  // menyalin header untuk dimanipulasi
  const newData = [...header];
  const [refresh, setRefresh] = useState();
  const [jadwalKuliah, setJadwalKuliah] = useState(newData);
  const [isSave, setIsSave] = useState(false);
  const [id_kelas, setId_kelas] = useState([]);

  // membuat plan
  useEffect(() => {
    // console.log( is_saved , data.id)
    const setPlan = () => {
      if (is_saved) {
        setIsSave(true);
      } else {
        setIsSave(false);
      }
      // console.log(data);
      // console.log("ini current page nya" + currentPage);
      // console.log(jadwalKuliah);
      Array.isArray(data) &&
        data.map((item, i) => (
          <div key={item.id}>
            {item.jadwal_kelas.map((jadwal, index) => (
              <div key={index}>
                {setTable(
                  `${jadwal.jam_mulai} - ${jadwal.jam_selesai}`,
                  jadwal.hari.toLowerCase(),
                  item.nama_kelas,
                  item.nama_matkul
                )}
              </div>
            ))}
          </div>
        ));
      // console.log(id_kelas);
    };

    // Mengatur posisi data dalam tabel
    const setTable = (waktu, hari, kelas, matkul) => {
      // Menemukan object yang sesuai untuk di edit
      const found = jadwalKuliah.find((obj) => {
        return obj.jam === waktu;
      });

      // merubah object terpilih (found)
      const updateJadwal = {
        ...found,
        [hari]: `${matkul} (${kelas})`,
      };
      // jadwal palsu yang di updated
      const telahUpdated = [...jadwalKuliah];
      telahUpdated.map((item, i) => {
        if (item.jam === updateJadwal.jam) {
          return (jadwalKuliah[i] = updateJadwal);
        }
        return null;
      });

      // merubah jadwal asli
      setJadwalKuliah(telahUpdated);
    };
    setPlan();
    setRefresh(false);
    // console.log("Jadwal-nya");
    // console.log(jadwalKuliah);
  }, [data, refresh]);

  // Clear Jadwal Tabel agar bisa dipakai
  useEffect(() => {
    setJadwalKuliah(newData);
    setRefresh(true);
  }, [currentPage]);

  // isSave
  const handleIsSave = async () => {
    const token = localStorage.getItem("Authorization");
    // membuat header agar bisa akses endpoint dengan token

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setId_kelas([]);
    data.map((item, i) => {
      {
        id_kelas.push(item.id_kelas);
      }
    });

    // console.log(id_kelas);
    // console.log(isSave);
    // console.log("ini baru");
    // console.log(data);
    try {
      const response = await url.post("/my-plan", { id_kelas }, config);
      // console.log("Berhasil");
      // console.log(response);
    } catch (err) {
      console.log(err);
    }

    setIsSave(true);
  };

  // useEffect(() => {
  //   console.log(isSave);
  // }, [isSave]);

  const navigate = useNavigate();

  const barisTabel = () => {
    return `text-center px-2 font-semibold text-sm `;
  };

  const jamTabel = () => {
    return `py-2 px-4 text-center font-bold text-[14px] `;
  };

  const headerTabel = () => {
    return `px-4 py-2 ${dashboardUser && `  `}`;
  };

  // Melakukan update terhadap jadwal
  const update = () => {
    setId_kelas([]);
    // console.log(data);
    data.forEach((item, i) => {
      id_kelas.push(item.id_kelas);
    });
    navigate("/planning-krs", {
      state: {
        id: idPlan,
        data: id_kelas,
      },
    });
  };

  return (
    <>
      <div
        className={` ${
          dashboardUser ? "" : "min-h-[448px] bg-secondary px-7 pb-1 pt-4"
        } `}
      >
        <div className={`${dashboardUser ? `` : `mt-5 mb-9`}`}>
          {" "}
          {/* mbungkus semua plan */}
          <>
            {" "}
            {/* isi tiap plan */}
            {dashboardUser ? (
              <></>
            ) : (
              <h1 className="text-2xl font-bold mb-4">Plan {plan}</h1>
            )}
            <div
              className={`${
                dashboardUser &&
                `rounded-2xl overflow-y-scroll mt-[10px] h-[290px] scrollbar scrollbar-w-[5px] scrollbar-thumb-neutral-400 `
              } `}
            >
              <table
                className={`table-fixed  border-collapse border-b border-neutral-400 w-full drop-shadow-xl rounded-2xl  ... ${
                  dashboardUser ? `` : ` overflow-hidden  min-w-fit`
                } `}
              >
                <thead className="">
                  <tr
                    className={` ${
                      dashboardUser && ` sticky top-0 `
                    } bg-primary  text-secondary`}
                  >
                    <th
                      className={`${headerTabel()} flex justify-center items-center `}
                    >
                      <img src={LogoJam} alt="logo-jam" className="" />
                    </th>
                    <th className={headerTabel()}>Senin</th>
                    <th className={headerTabel()}>Selasa</th>
                    <th className={headerTabel()}>Rabu</th>
                    <th className={headerTabel()}>Kamis</th>
                    <th className={headerTabel()}>Jumat</th>
                  </tr>
                </thead>
                <tbody className={`${dashboardUser && ``} `}>
                  {jadwalKuliah.map((jadwal, index) => (
                    <tr
                      key={index}
                      className={` ${
                        dashboardUser && ``
                      } bg-secondary text-neutral-900 border-b border-neutral-400`}
                    >
                      <td className={jamTabel()}>{jadwal.jam}</td>
                      <td className={barisTabel()}>{jadwal.senin}</td>
                      <td className={barisTabel()}>{jadwal.selasa}</td>
                      <td className={barisTabel()}>{jadwal.rabu}</td>
                      <td className={barisTabel()}>{jadwal.kamis}</td>
                      <td className={barisTabel()}>{jadwal.jumat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="my-6 flex justify-end">
              {dashboardUser ? (
                <></>
              ) : myPlan ? (
                <div className="flex gap-6">
                  <button
                    onClick={() => {
                      update();
                    }}
                    className="font-bold bg-accent flex items-center py-[11px] px-[16px] gap-2 rounded-[10px]"
                  >
                    <FiEdit2 />
                    Update
                  </button>
                  <button
                    onClick={() => deleteHandler(idDelete)}
                    className="font-bold bg-error flex items-center py-[11px] px-[16px] gap-2 rounded-[10px] text-secondary"
                  >
                    <FiTrash />
                    Delete
                  </button>
                </div>
              ) : isSave ? (
                <>
                  <div className="flex flex-col items-end justify-end gap-2">
                    <div className="flex justify-center items-center flex-row bg-neutral-200 w-[150px] h-[50px] gap-2 rounded-[10px] font-bold">
                      <img src={success}></img>
                      <p className="text-neutral-400">Plan Added</p>
                    </div>
                    <div>
                      To see your saved plan, go to &nbsp;
                      <span className="text-primary hover:underline hover:duration-500">
                        <Link to="/myplan">My Plan</Link>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  icon={<FiPlus />}
                  name='Add to "MyPlans"'
                  disabled={isDisabled}
                  onClick={(e) => handleIsSave()}
                />
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default TablePlan;
