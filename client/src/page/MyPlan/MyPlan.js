import { useEffect, useState } from "react";
import { url } from "../../api/url";
import Paginations from "../../component/Paginations";
import TablePlan from "../../component/TablePlan";

const MyPlan = () => {
  const [myPlan, setMyPlan] = useState([]);
  const [success, setSuccess] = useState(false);
  const [trigger, setTrigger] = useState(true);
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  // Mencoba get myplan
  useEffect(() => {
    const fetchMyPlan = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("Get Data My Plan");
        const res = await url.get("/my-plan", config);
        console.log(res);
        setMyPlan(res.data.data);
        setSuccess(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMyPlan();
  }, [trigger]);

  // Delete Handler
  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Hapus Data");
      const res = await url.delete(`/my-plan/${id}`, config);
      console.log(res);
      if (res.status === 200) {
        setTrigger(!trigger);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {success && (
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
        </>
      )}
    </>
  );
};

export default MyPlan;
