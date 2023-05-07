import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import Button from "../../component/Button";
import Paginate from "../../component/Paginate";
import TablePlan from "./TablePlan";
import { PaginationRandom } from "./PaginationRandom";


const RandomKrs = () => {
  const [plan, setPlan] = useState([]);
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [clear, setClear] = useState(false)
  
  console.log(plan)


  useEffect(() => {
    const fetchRandomKrs = async () => {
      try {
        const respone = await axios.get("http://localhost:8080/random-krs");
        // console.log("===============GET DATA=================")
        // console.log(respone.data);
        setPlan(respone.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRandomKrs();
    
  }, []);
  console.log()

  useEffect(()=>{
    setClear(true)
  },[currentPage])


  // Pagination Logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage
 
  return (
    <>
      <div className=" bg-secondary px-7 pt-7">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-sm font-semibold mb-4 pt-4">
            Kamu dapat menemukan Plan KRS tanpa melakukan perencanaan KRS secara
            manual.
          </h3>
          <Button icon={<FiFilter />} name="Filter" />
        </div>
      </div>
    
      {plan &&
        plan.slice(firstPostIndex, lastPostIndex).map((plans, i ) => (
          <div key={i}>
            {console.log("dijalankan")}
            {console.log(plans)}
            <TablePlan data={plans} plan={firstPostIndex+i+1} clear={currentPage}></TablePlan>
          </div>
        ))}
      <div className=" bg-secondary p-7">
        <Paginate postPerPage={1} totalPost={8} paginate={Paginate} />
        <PaginationRandom
          totalPosts = {plan.length}
          postsPerPage = {postsPerPage}
          setCurrentPage={setCurrentPage}
        ></PaginationRandom>
      </div>
    </>
  );
};

export default RandomKrs;
