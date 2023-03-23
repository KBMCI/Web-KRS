import { FiTrash2, FiEdit2, FiSearch } from "react-icons/fi";
import { useContext, useState } from "react";
import { MatkulContext } from "../../api/contextMatkul";
import { Link } from "react-router-dom";
import Paginate from "../../component/Paginate";
import axios from "axios";
import { urlMatkul } from "../../api/url";
import Feedback from "../../component/Feedback";
import PopUpDel from "../../component/PopUpDel";
import ReactLoading from "react-loading";

export default function MatkulTabel() {
  const { dataMatkul, tableNama } = useContext(MatkulContext);
  const { Trigger } = useContext(MatkulContext);
  const [accept, setAccept] = useState(false);
  const [result, setResult] = useState(true);
  const [loading, setLoading] = useState(false);

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
      try {
        setLoading(true);
        const res = await axios.delete(`${urlMatkul}/${showDel.id}`);
        if (res.status === 200) {
          console.log(res);
          setResult(true);
          setLoading(false);
          setShowDel({
            show: false,
            id: null,
          });
          feedback();
          Trigger();
        }
      } catch (err) {
        setResult(false);
        setLoading(false);
        feedback();
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

  console.log(currentPost);
  // Feedback
  const feedback = () => {
    setAccept(true);
    setTimeout(() => {
      setAccept(false);
    }, 1500);
  };

  return (
    <>
      <div className="rounded-xl overflow-hidden shadow-lg ">
        {dataMatkul.length !== 0 ? (
          <>
            <div className="w-full py-2 px-4 flex align-center gap-x-2 bg-secondary">
              <label htmlFor="">
                <FiSearch className="inline-block" />
              </label>
              <input type="text" placeholder="Search Mata Kuliah" />
            </div>
            <div className="min-h-[448px] bg-secondary">
              <table className="border-collapse border-b border-neutral-400 w-full ">
                <thead>
                  <tr className="bg-primary text-secondary">
                    {tableNama.map((value) => {
                      return (
                        <th className="py-2 w-auto text-start p-4" key={value}>
                          {value}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {currentPost.map((value) => {
                    return (
                      <tr
                        key={value.kode_matkul}
                        className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                      >
                        <th className="py-2 text-start p-4 font-semibold">
                          {value.kode_matkul}
                        </th>
                        <th className="py-2 text-start p-4 font-semibold">
                          {value.nama}
                        </th>
                        <th className="py-2 text-start p-4 font-semibold">
                          {value.sks} SKS
                        </th>
                        <th className="py-2 text-start p-4 font-semibold">
                          {value.tahun_kurikulum}
                        </th>
                        <th className="flex py-2 text-2xl justify-around gap-x-2 align-center">
                          <button>
                            <Link to={`${value.kode_matkul}`}>
                              <FiEdit2 className="text-primary" />
                            </Link>
                          </button>
                          <button
                            onClick={deleteHandler.bind(
                              this,
                              value.kode_matkul
                            )}
                          >
                            <FiTrash2 className="text-primary" />
                          </button>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="py-2 bg-primary text-secondary border-t border-neutral-400">
              <Paginate
                postPerPage={postPerPage}
                totalPost={dataMatkul.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
              />
            </div>
          </>
        ) : (
          <>
            <div className="absolute z-30">
              <ReactLoading width="20px" type="balls" color="#4071F0" />
            </div>
          </>
        )}
      </div>
      {/* Show Delete */}
      {showDel.show && (
        <PopUpDel
          deleteHandlerFalse={deleteHandlerFalse}
          deleteHandlerTrue={deleteHandlerTrue}
          loading={loading}
        />
      )}
      {accept ? (
        result ? (
          <Feedback check={true} note="delete" />
        ) : (
          <Feedback check={false} note="delete" />
        )
      ) : (
        ""
      )}
    </>
  );
}
