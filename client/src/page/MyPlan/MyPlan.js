import { useEffect, useState } from "react";
import { url } from "../../api/url";
import Paginations from "../../component/Paginations";
import TablePlan from "../../component/TablePlan";
import Message from "../PlanningKrs/components/message/Message";
import PopUpDel from "../../component/PopUpDel";
import PageLoading from "../../component/loader/PageLoading";

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

        setMyPlan(result.data.data);

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

  return (
    <>
      {loadingPage ? (
        <PageLoading />
      ) : (
        <>
          <div className=" bg-secondary px-7 pt-7">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-sm font-semibold mb-4 pt-4">
                Kumpulan Plan KRS yang telah kamu simpan sebelumnya
              </h3>
            </div>
          </div>

          {myPlan &&
            myPlan?.slice(firstPostIndex, lastPostIndex).map((plans, i) => {
              console.log(plans);
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
