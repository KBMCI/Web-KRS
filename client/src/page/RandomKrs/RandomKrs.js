import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import Button from "../../component/Button";
import Paginations from "./Paginations";
import TablePlan from "./TablePlan";

const RandomKrs = () => {
  const [plan, setPlan] = useState([]);
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  // Berhasil Ambil data
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRandomKrs = async () => {
      // setLoading(true)

      // setTimeout(()=>{
      //     setLoading(false)
      // }, 10000)

      try {
        // mengambil token di localstorage
        const token = localStorage.getItem("Authorization");
        // membuat header agar bisa akses endpoint dengan token
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // get data random krs
        const respone = await axios.get(
          "http://localhost:8080/random-krs",
          config
        );
        console.log("load data");
        setPlan(respone.data.data);
        setSuccess(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRandomKrs();
  }, []);

  return (
    <>
      {success ? (
        <>
          <div className=" bg-secondary px-7 pt-7">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-sm font-semibold mb-4 pt-4">
                Kamu dapat menemukan Plan KRS tanpa melakukan perencanaan KRS
                secara manual.
              </h3>
              <Button icon={<FiFilter />} name="Filter" />
            </div>
          </div>

          {plan &&
            plan.slice(firstPostIndex, lastPostIndex).map((plans, i) => (
              <div key={i}>
                <TablePlan
                  data={plans.random_krs}
                  plan={firstPostIndex + i + 1}
                  currentPage={currentPage}                
                  ></TablePlan>
              </div>
            ))}
          <div className=" bg-secondary p-7">
            <Paginations
              data={plan}
              itemsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-[25%]">
          <img src="https://cdn-icons-png.flaticon.com/512/962/962207.png?w=740&t=st=1683589903~exp=1683590503~hmac=4380adf1cbdd075c3cc273144e3d75dff9290e8fe92e3d2f536913c220f59088" className="animate-spin h-16 w-16"></img>
        </div>
      )}
    </>
  );
};

export default RandomKrs;
