import { useEffect, useState } from "react";
import { url } from "../../api/url";
import Paginations from "../../component/Paginations";
import TablePlan from "../../component/TablePlan";
import Message from "../PlanningKrs/components/message/Message";
import PopUpDel from "../../component/PopUpDel";
import bgBlue from "../../assets/backgroundBlue.png"
import PageLoading from "../../component/loader/PageLoading";
import noPlanImage from "../../assets/noPlanImage.svg";
import { Link } from "react-router-dom";

const MyPlan = () => {
  const [myPlan, setMyPlan] = useState([]);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState({
    open: false,
    status: false,
    message: "",
  });

  const [trigger, setTrigger] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  // Mencoba get myplan
  useEffect(() => {
    const fetchMyPlan = async () => {
      setLoadingPage(() => true);
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const result = await url.get("/my-plan", config);
        if (result?.response?.data) {
          setLoadingPage(() => false);
        }

        setMyPlan(() => result.data.data);

        setTimeout(() => {
          setLoadingPage(() => false);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMyPlan();
  }, [trigger]);

  //  create delete show
  const [showDel, setShowDel] = useState({
    show: false,
    id: null,
  });

  // perform deletion and hide popup
  const deleteHandlerTrue = async () => {
    if (showDel.show && showDel.id) {
      setLoading(true);
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const result = await url.delete(`/my-plan/${showDel.id}`, config);

        if (result?.response?.data) {
          setNotif(() => ({
            open: true,
            status: false,
            message: result.response.data.message,
          }));

          setLoading(false);

          setTimeout(() => {
            setNotif((prev) => ({
              ...prev,
              open: false,
            }));
          }, 2000);
          return;
        }

        setNotif(() => ({
          open: true,
          status: true,
          message: result.data.message,
        }));
        setLoading(false);

        setTrigger((prev) => !prev);

        setShowDel(() => ({
          show: false,
          id: null,
        }));

        setTimeout(() => {
          setNotif((prev) => ({
            ...prev,
            open: false,
          }));
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Show Confimation Box Delete
  const deleteHandler = (id) => {
    setShowDel({
      show: true,
      id,
    });
  };

  // hide confrimation box
  const deleteHandlerFalse = () => {
    setShowDel({
      show: false,
      id: null,
    });
  };

  useEffect(() => {
    console.log(myPlan)
  }, [myPlan])

  return (
    <>
      {loadingPage ? (
        <PageLoading />
      ) : (
        <>
          <div className=" bg-secondary px-7 py-[15px] mt-2" style={{ backgroundImage: `url(${bgBlue})` }}>
            <div className="space-y-1 text-secondary">
              <h1 className="font-bold text-[28px]">My Plans</h1>
              <h2 className="font-semibold">
                Kamu bisa membuat KRS sesuai kemauanmu!
              </h2>
            </div>
          </div>
          {myPlan ? (
            <>
              {myPlan?.slice(firstPostIndex, lastPostIndex).map((plans, i) => {
                return (
                  <div key={i}>
                    <TablePlan
                      data={plans.plan}
                      plan={firstPostIndex + i + 1}
                      currentPage={currentPage}
                      myPlan={true}
                      deleteHandler={deleteHandler}
                      idDelete={plans.id}
                      idPlan={plans.id}
                      loading={loading}
                    />
                  </div>
                );
              })}

              <div className=" bg-secondary p-7">
                <Paginations
                  data={myPlan}
                  itemsPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>

              {showDel.show && (
                <PopUpDel
                  deleteHandlerFalse={deleteHandlerFalse}
                  deleteHandlerTrue={deleteHandlerTrue}
                  loading={loading}
                  name={"plan"}
                />
              )}
            </>
          ) : (
            <div className="flex justify-center">
              <div className="pt-8 flex flex-col space-y-2 justify-center items-center">
                <h1 className="w-3/4 text-center text-neutral-400">
                  Oops! Kamu belum memiliki Plan KRS yang tersimpan. Silahkan buat pada halaman <Link className="font-semibold" to={`/planning-krs`}>Planning KRS</Link> atau <Link className="font-semibold" to={`/random-krs`}>Random KRS</Link>  terlebih dahulu
                </h1>
                <img
                  src={noPlanImage}
                  alt="noPlanImage"
                />
              </div>
            </div>
          )}
        </>
      )}
      <Message
        open={notif.open}
        statusMsg={notif.status}
        textMsg={notif.message}
      />
    </>
  );
};

export default MyPlan;
