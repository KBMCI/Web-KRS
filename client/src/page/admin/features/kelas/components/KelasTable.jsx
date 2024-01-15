import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import PopUpDel from "../../../../../component/PopUpDel";
import { deleteKelas } from "../services/deleteKelas";

const KelasTable = ({ data, setNotif, setRefresh }) => {
  const tabel = [
    "Nama Mata Kuliah",
    "Nama Kelas",
    "Ruang Kelas",
    "Hari",
    "Jam Mulai",
    "Jam Selesai",
    " ",
  ];
  const token = window.localStorage.getItem("Authorization");
  const [loadingBtn, setLoadingBtn] = useState(false);

  //  create delete show
  const [showDel, setShowDel] = useState({
    show: false,
    id: null,
  });

  // perform deletion and hide popup
  const deleteHandlerTrue = async () => {
    if (showDel.show && showDel.id) {
      setLoadingBtn(true);
      try {
        const result = await deleteKelas(token, showDel.id.idKelas);

        if (result?.response?.data) {
          setLoadingBtn(false);
          setNotif(() => ({
            open: true,
            status: false,
            message: result.response.data.message,
          }));

          setTimeout(() => {
            setNotif((prev) => ({
              ...prev,
              open: false,
            }));
          }, 2000);
          return;
        }

        setTimeout(() => {
          setNotif(() => ({
            open: true,
            status: true,
            message: result.data.message,
          }));
          setLoadingBtn(false);
          setRefresh((prev) => !prev);
        }, 1000);

        setTimeout(() => {
          setNotif((prev) => ({
            ...prev,
            open: false,
          }));
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Show Confimation Box Delete
  const deleteHandler = (idKelas, idJadwal) => {
    setShowDel({
      show: true,
      id: {
        idKelas,
        idJadwal,
      },
    });
  };

  // hide confrimation box
  const deleteHandlerFalse = () => {
    setShowDel({
      show: false,
      id: null,
    });
  };

  // Style Component
  const barisTabel = () => {
    return "py-2 text-start px-4 font-semibold";
  };
  return (
    <>
      <div className="min-h-[448px] bg-secondary">
        <table className="border-collapse border-b border-neutral-400 w-full ">
          <thead>
            <tr className="bg-primary text-secondary">
              {tabel.map((value) => {
                return (
                  <th className="py-2 w-auto text-start px-4" key={value}>
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((kelas) => {
              return kelas?.jadwal_kelas?.map((jadwal_kelas) => {
                return (
                  <tr
                    key={jadwal_kelas.id}
                    className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                  >
                    <th className={barisTabel()}>{kelas.matkul.nama}</th>
                    <th className={barisTabel()}>{kelas.nama}</th>
                    <th className={barisTabel()}>
                      {jadwal_kelas?.ruang_kelas}
                    </th>
                    <th className={barisTabel()}>{jadwal_kelas?.hari}</th>
                    <th className={barisTabel()}>{jadwal_kelas?.jam_mulai}</th>
                    <th className={barisTabel()}>
                      {jadwal_kelas?.jam_selesai}
                    </th>
                    <th className="py-2 px-4">
                      <div className="flex text-2xl justify-around gap-5 align-center">
                        <button>
                          <Link to={`${kelas.id}/jadwal/${jadwal_kelas.id}`}>
                            <FiEdit2 className="text-primary" />
                          </Link>
                        </button>
                        <button
                          onClick={deleteHandler.bind(
                            this,
                            kelas.id,
                            jadwal_kelas.id
                          )}
                        >
                          <FiTrash2 className="text-primary" />
                        </button>
                      </div>
                    </th>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
      {/* Show Delete */}
      {showDel.show && (
        <PopUpDel
          deleteHandlerFalse={deleteHandlerFalse}
          deleteHandlerTrue={deleteHandlerTrue}
          loading={loadingBtn}
        />
      )}
    </>
  );
};

export default KelasTable;
