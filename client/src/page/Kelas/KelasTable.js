import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import PopUpDel from "../../component/PopUpDel";

const KelasTable = ({
  data,
  showDel,
  deleteHandlerFalse,
  deleteHandlerTrue,
  deleteHandler,
}) => {
  const tabel = [
    "Nama Mata Kuliah",
    "Nama Kelas",
    "Ruang Kelas",
    "Hari",
    "Jam Mulai",
    "Jam Selesai",
    " ",
  ];

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
            {data?.map((value) => {
              return value.jadwal_kelas.map((kelas) => {
                return (
                  <tr
                    key={kelas.id}
                    className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                  >
                    <th className={barisTabel()}>{value.matkul.nama}</th>
                    <th className={barisTabel()}>{value.nama}</th>
                    <th className={barisTabel()}>{kelas.ruang_kelas}</th>
                    <th className={barisTabel()}>{kelas.hari}</th>
                    <th className={barisTabel()}>{kelas.jam_mulai}</th>
                    <th className={barisTabel()}>{kelas.jam_selesai}</th>
                    <th className="py-2 px-4">
                      <div className="flex text-2xl justify-around gap-5 align-center">
                        <button>
                          <Link to={`${value.id}/jadwal/${kelas.id}`}>
                            <FiEdit2 className="text-primary" />
                          </Link>
                        </button>
                        <button
                          onClick={deleteHandler.bind(this, value.id, kelas.id)}
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
        />
      )}
    </>
  );
};

export default KelasTable;
