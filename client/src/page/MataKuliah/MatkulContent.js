import MatkulTabel from "./MatkulTabel";
import Button from "../../component/Button";
import { FiPlus, FiTrello } from "react-icons/fi";
import { useState, useContext } from "react";
import { url } from "../../api/url";
import Paginate from "../../component/Paginate";
import FilterTable from "../../component/FilterTable";
import { MatkulContext } from "../../context/contextMatkul";
import ReactLoading from "react-loading";

function MatkulContent({ feedbackHandler }) {
  const { dataMatkul, tableNama } = useContext(MatkulContext);
  const { Trigger } = useContext(MatkulContext);
  const [loading, setLoading] = useState(false);

  // Membuat Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = dataMatkul.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(dataMatkul.length / postPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

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
    setLoading(true);
    if (showDel.show && showDel.id) {
      try {
        const res = await url.delete(`/matkul/${showDel.id}`);
        if (res.status === 200) {
          console.log(res);
          feedbackHandler(true, "delete");
          Trigger();
          setLoading(false);
          setShowDel({
            show: false,
            id: null,
          });
        }
      } catch (err) {
        console.log(err);
        feedbackHandler(false, "delete");
        setLoading(false);
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

  return (
    <>
      <div className={`px-10 pt-10`}>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold"> Mata Kuliah</h1>
          <div className="flex gap-4">
            <Button icon={<FiTrello />} to="" name="Import By Excel" />
            <Button
              icon={<FiPlus />}
              to="/mata-kuliah/tambah"
              name="Mata Kuliah"
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="grow">
            <div className="rounded-xl overflow-hidden shadow-lg bg-secondary">
              <FilterTable />
              <MatkulTabel
                data={currentPost}
                tabel={tableNama}
                showDel={showDel}
                deleteHandler={deleteHandler}
                deleteHandlerFalse={deleteHandlerFalse}
                deleteHandlerTrue={deleteHandlerTrue}
                loading={loading}
              />
              <Paginate
                postPerPage={postPerPage}
                totalPost={dataMatkul.length}
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

export default MatkulContent;
