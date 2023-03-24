import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import PopUpDel from "../../component/PopUpDel";

const KelasTable = ({
  tabel,
  data,
  showDel,
  deleteHandlerFalse,
  deleteHandlerTrue,
  deleteHandler,
}) => {
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
            {data.map((value) => {
              return (
                <tr
                  key={value.id}
                  className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                >
                  <th className="py-2 text-start px-4 font-semibold">
                    {value.matkul.nama}
                  </th>
                  <th className="py-2 text-start px-4 font-semibold">
                    {value.nama}
                  </th>
                  <th className="py-2 text-start px-4 font-semibold">
                    {value.ruang_kelas}
                  </th>
                  <th className="py-2 text-start px-4 font-semibold">
                    {value.hari}
                  </th>
                  <th className="py-2 text-start px-4 font-semibold">
                    {value.jam_mulai}
                  </th>
                  <th className="py-2 text-start px-4 font-semibold">
                    {value.jam_selesai}
                  </th>
                  <th className="py-2 px-4">
                    <div className="flex text-2xl justify-around gap-5 align-center">
                      <button>
                        <Link to={`${value.id}`}>
                          <FiEdit2 className="text-primary" />
                        </Link>
                      </button>
                      <button onClick={deleteHandler.bind(this, value.id)}>
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
        />
      )}
    </>
  );
};

export default KelasTable;
