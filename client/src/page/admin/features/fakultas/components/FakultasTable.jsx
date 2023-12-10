import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import PopUpDel from "../../../../../component/PopUpDel";
import { deleteFakultas } from "../services/deleteFakultas";

export default function FakultasTable({ data, setNotif, setRefresh }) {
  const table = ["Nama", ""];
  const token = window.localStorage.getItem("Authorization");
  const [loadingBtn, setLoadingBtn] = useState(false);

  // Delete Handler
  const [showDel, setShowDel] = useState({
    show: false,
    id: null,
  });

  // Show Confimation Box Delete
  const deleteHandler = (id) => {
    setShowDel({
      show: true,
      id,
    });
  };

  // perform deletion and hide popup
  const deleteHandlerTrue = async () => {
    if (showDel.show && showDel.id) {
      setLoadingBtn(true);
      try {
        const result = await deleteFakultas(token, showDel.id);

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
        setLoadingBtn(false);
      }
    }
  };

  // hide confrimation box when user click's cancel
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
                  key={value.id}
                  className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                >
                  <th className={barisTabel()}>{value.nama}</th>
                  <th className=" py-2 px-4">
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
          loading={loadingBtn}
        />
      )}
    </>
  );
}
