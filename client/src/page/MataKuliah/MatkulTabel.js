import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import PopUpDel from "../../component/PopUpDel";

export default function MatkulTabel({
  data,
  showDel,
  deleteHandlerFalse,
  deleteHandlerTrue,
  deleteHandler,
  loading,
}) {
  const table = [
    "Kode MK",
    "Nama Mata Kuliah",
    "SKS",
    "Tahun Kurikulum",
    "",
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
              {table.map((value) => {
                return (
                  <th className="py-2 w-auto text-start p-4" key={value}>
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((value) => {
              return (
                <tr
                  key={value.kode_matkul}
                  className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                >
                  <th className={barisTabel()}>{value.kode_matkul}</th>
                  <th className={barisTabel()}>{value.nama}</th>
                  <th className={barisTabel()}>{value.sks} SKS</th>
                  <th className={barisTabel()}>{value.tahun_kurikulum}</th>
                  <th className=" py-2 px-4">
                    <div className="flex text-2xl justify-around gap-5 align-center">
                      <button>
                        <Link to={`${value.kode_matkul}`}>
                          <FiEdit2 className="text-primary" />
                        </Link>
                      </button>
                      <button
                        onClick={deleteHandler.bind(this, value.kode_matkul)}
                      >
                        <FiTrash2 className="text-primary" />
                      </button>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Show Delete */}
      {showDel.show && (
        <PopUpDel
          deleteHandlerFalse={deleteHandlerFalse}
          deleteHandlerTrue={deleteHandlerTrue}
          loading={loading}
        />
      )}
    </>
  );
}
