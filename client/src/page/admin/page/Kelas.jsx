import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Message from "../../PlanningKrs/components/message/Message";
// import Button from "../../component/Button";
// import FilterTable from "../../component/FilterTable";
import { FiPlus } from "react-icons/fi";
import Button from "../../../component/Button";
import Paginations from "../../../component/Paginations";
import PageLoading from "../../../component/loader/PageLoading";
import KelasTable from "../features/kelas/components/KelasTable";
import { getAllKelas } from "../features/kelas/services/getAllKelas";

function Kelas() {
  const [dataKelas, setDataKelas] = useState([]);
  const token = window.localStorage.getItem("Authorization");
  const [refresh, setRefresh] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);

  // Mengambil data Kelas
  useEffect(() => {
    setLoadingTable(true);
    const getAllDataKelas = async () => {
      try {
        const result = await getAllKelas(token);

        if (result?.response?.data) {
          alert(result.response.data.message);
          setTimeout(() => {
            setLoadingTable(false);
          }, 1500);
          return;
        }
        setDataKelas(() => result.data.data);
        setTimeout(() => {
          setLoadingTable(false);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDataKelas();
  }, [refresh]);

  // Create Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
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
          <h1 className="text-4xl font-bold">Kelas</h1>
          <div className="flex gap-4">
            {/* <Button icon={<FiTrello />} to="" name="Import By Excel" /> */}
            <Button icon={<FiPlus />} to="tambah" name="Add Kelas" />
          </div>
        </div>
        {!loadingTable ? (
          <div className="flex justify-center mb-7">
            <div className="grow">
              <div className="rounded-xl overflow-hidden shadow-lg bg-secondary">
                <KelasTable
                  data={dataKelas.slice(firstPostIndex, lastPostIndex)}
                  setNotif={setNotif}
                  setRefresh={setRefresh}
                />
                <Paginations
                  data={dataKelas}
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
}

export default Kelas;
