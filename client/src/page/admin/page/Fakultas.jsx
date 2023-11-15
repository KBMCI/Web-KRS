import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import Button from "../../../component/Button";
import Paginations from "../../../component/Paginations";
import PageLoading from "../../../component/loader/PageLoading";
import Message from "../../PlanningKrs/components/message/Message";
import FakultasTable from "../features/fakultas/components/FakultasTable";
import { getAllFakultas } from "../features/fakultas/services/getAllFakultas";

const Fakultas = () => {
  const token = window.localStorage.getItem("Authorization");
  const [dataFakultas, setDataFakultas] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);

  // getAllMatkul
  useEffect(() => {
    setLoadingTable(true);
    const getAllDataFakultas = async () => {
      try {
        const result = await getAllFakultas(token);

        if (result?.response?.data) {
          alert(result.response.data.message);
          setTimeout(() => {
            setLoadingTable(false);
          }, 1500);
          return;
        }
        setDataFakultas(() => result.data.data);
        setTimeout(() => {
          setLoadingTable(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDataFakultas();
  }, [refresh]);

  // Create Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  // Menampilkan Notification
  const [notif, setNotif] = useState({
    open: false,
    status: false,
    message: "",
  });

  return (
    <>
      <div className={`px-10 pt-10`}>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Fakultas</h1>
          <div className="flex gap-4">
            {/* <Button icon={<FiTrello />} to="" name="Import By Excel" /> */}
            <Button icon={<FiPlus />} to="tambah" name="Add Fakultas" />
          </div>
        </div>
        {!loadingTable ? (
          <div className="flex justify-center mb-7">
            <div className="grow">
              <div className="rounded-xl overflow-hidden shadow-lg bg-secondary">
                <FakultasTable
                  data={dataFakultas.slice(firstPostIndex, lastPostIndex)}
                  setNotif={setNotif}
                  setRefresh={setRefresh}
                />
                <Paginations
                  data={dataFakultas}
                  itemsPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        ) : (
          <PageLoading />
        )}
      </div>
      <Outlet context={{ setNotif, setRefresh }} />
      <Message
        open={notif.open}
        statusMsg={notif.status}
        textMsg={notif.message}
      />
    </>
  );
};

export default Fakultas;
