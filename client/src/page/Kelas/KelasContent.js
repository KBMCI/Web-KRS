import Button from "../../component/Button";
import Paginate from "../../component/Paginate";
import KelasTable from "./KelasTable";
import { FiPlus, FiTrello } from "react-icons/fi";
import FilterTable from "../../component/FilterTable"
import { useEffect, useState } from "react";
import { url } from "../../api/url";

function KelasContent({ dataKelas, dataTrigger, feedbackHandler }) {
  // Inisiasi data
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataKelas);
  }, [dataKelas]);

  // Isi Tabel Kelas
  const tabelKelas = [
    "Nama Mata Kuliah",
    "Nama Kelas",
    "Ruang Kelas",
    "Hari",
    "Jam Mulai",
    "Jam Selesai",
    " ",
  ];

  // Create pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //  create delete show
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
      try {
        const res = await url.delete(`/kelas/${showDel.id}`);
        if (res.status === 200) {
          console.log(res);
          dataTrigger();
          feedbackHandler(true, "delete");
          setShowDel({
            show: false,
            id: null,
          });
        }
      } catch (err) {
        feedbackHandler(false, "delete");
      }
    }
  };

  // hide confrimation box
  const deleteHandlerFalse = () => {
    setShowDel({
      show: false,
      id: null,
    });
  };

  return (
    <>
      <div className="px-10 pt-10">
        {/* Membuat Judul dan Button tambah, excel Kelas */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Kelas</h1>
          <div className="flex gap-4">
            <Button icon={<FiTrello />} name={"Import Excel"} />
            <Button icon={<FiPlus />} name={"Kelas"} to="/kelas/tambah" />
          </div>
        </div>
        {/* Tabel Kelas */}
        <div className="flex justify-center">
          <div className="grow">
            <div className="rounded-xl overflow-hidden shadow-lg bg-secondary">
              <FilterTable />
              <KelasTable
                data={currentPost}
                tabel={tabelKelas}
                showDel={showDel}
                deleteHandler={deleteHandler}
                deleteHandlerFalse={deleteHandlerFalse}
                deleteHandlerTrue={deleteHandlerTrue}
              />
              <Paginate
                postPerPage={postPerPage}
                totalPost={data.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KelasContent;
