import { useContext, useState } from "react";
import { FiPlus, FiTrello } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { url } from "../../api/url";
import Button from "../../component/Button";
import Feedback from "../../component/Feedback";
import FilterTable from "../../component/FilterTable";
import Paginate from "../../component/Paginate";
import { DataContext } from "../../context/DataContext";
import UserTabel from "./UserTabel";

function UserContent() {
  const { dataUser, TriggerUser } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  // Membuat Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = dataUser?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(dataUser?.length / postPerPage)) {
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
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await url.delete(`/user/${showDel.id}`, config);
        if (res.status === 200) {
          console.log(res);
          feedbackHandler(true, "delete");
          TriggerUser();
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
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.nama) {
      errors.nama = "Nama User is required";
    }
    if (!values.program_studi) {
      errors.program_studi = "Program Studi is required";
    }
    if (!values.nim) {
      errors.nim = "NIm is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.role) {
      errors.role = "Role is required";
    }
    return errors;
  };
  return (
    <>
      <div className={`px-10 pt-10`}>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">User Panel</h1>
          <div className="flex gap-4">
            <Button icon={<FiTrello />} to="" name="Import By Excel" />
            <Button icon={<FiPlus />} to="tambah" name="Add User" />
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="grow">
            <div className="rounded-xl overflow-hidden shadow-lg bg-secondary">
              <FilterTable />
              <UserTabel
                data={currentPost}
                showDel={showDel}
                deleteHandler={deleteHandler}
                deleteHandlerFalse={deleteHandlerFalse}
                deleteHandlerTrue={deleteHandlerTrue}
                loading={loading}
              />
              <Paginate
                postPerPage={postPerPage}
                totalPost={dataUser?.length}
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

export default UserContent;
