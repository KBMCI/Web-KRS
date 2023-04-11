import MatkulTabel from "./MatkulTabel";
import Button from "../../component/Button";
import { FiPlus, FiTrello } from "react-icons/fi";
import { useState, useContext } from "react";
import { url } from "../../api/url";
import Paginate from "../../component/Paginate";
import FilterTable from "../../component/FilterTable";
import { DataContext } from "../../context/DataContext";
import { Outlet } from "react-router-dom";
import Feedback from "../../component/Feedback";

function MatkulContent() {
  const { dataMatkul, TriggerMatkul } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  // Membuat Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = dataMatkul?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(dataMatkul?.length / postPerPage)) {
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
          TriggerMatkul();
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

  // Menampilkan feedback
  const [feedback, setFeedback] = useState({
    show: false,
    check: false,
    note: null,
  });

  // Menampilkan feedback
  const feedbackHandler = (check, note) => {
    setFeedback({
      show: true,
      check: check,
      note: note,
    });
    setTimeout(() => {
      setFeedback({
        show: false,
        check: false,
        note: null,
      });
    }, 3000);
  };

  // Validate
  const validate = (values) => {
    const errors = {};
    const regexNumber = /^\d+$/;
    if (!values.kode_matkul) {
      errors.kode_matkul = "Kode Mata Kuliah is required";
    }
    if (!values.nama) {
      errors.nama = "Nama Mata Kuliah is required";
    }
    if (!values.sks) {
      errors.sks = "Jumlah SKS is required";
    } else if (!regexNumber.test(values.sks)) {
      errors.sks = "Number input type only";
    }
    if (!values.tahun_kurikulum) {
      errors.tahun_kurikulum = "Tahun Kurikulum is required";
    } else if (!regexNumber.test(values.tahun_kurikulum)) {
      errors.tahun_kurikulum = "Number input type only";
    }

    return errors;
  };

  return (
    <>
      <div className={`px-10 pt-10`}>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Mata Kuliah</h1>
          <div className="flex gap-4">
            <Button icon={<FiTrello />} to="" name="Import By Excel" />
            <Button
              icon={<FiPlus />}
              to="tambah"
              name="Add Mata Kuliah"
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="grow">
            <div className="rounded-xl overflow-hidden shadow-lg bg-secondary">
              <FilterTable />
              <MatkulTabel
                data={currentPost}
                showDel={showDel}
                deleteHandler={deleteHandler}
                deleteHandlerFalse={deleteHandlerFalse}
                deleteHandlerTrue={deleteHandlerTrue}
                loading={loading}
              />
              <Paginate
                postPerPage={postPerPage}
                totalPost={dataMatkul?.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Outlet context={{ feedbackHandler, validate }} />
      {feedback.show && (
        <Feedback check={feedback.check} note={feedback.note} />
      )}
    </>
  );
}

export default MatkulContent;
