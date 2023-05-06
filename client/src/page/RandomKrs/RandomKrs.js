import axios from "axios";
import React, { useEffect, useState } from "react";
import TablePlan from "./TablePlan";
import Button from "../../component/Button";
import Paginate from "../../component/Paginate";
import { FiFilter, FiPlus } from "react-icons/fi";


const RandomKrs = () => {
  const [matkul, setMatkul] = useState([]);

  useEffect(() => {
    const fetchRandomKrs = async () => {
      try {
        const respone = await axios.get("http://localhost:8080/random-krs");
        console.log(respone.data);
        setMatkul(respone.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRandomKrs();
  }, []);

  return (
    <>
     <div className=" bg-secondary px-7 pt-7">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-sm font-semibold mb-4 pt-4">Kamu dapat menemukan Plan KRS tanpa melakukan perencanaan KRS secara manual.</h3>
        <Button icon={<FiFilter />} name="Filter"/>
      </div>
      </div>
      <TablePlan data={matkul[0]}></TablePlan>
      <TablePlan data={matkul[2]}></TablePlan>
      <TablePlan data={matkul[3]}></TablePlan>
      <div className=" bg-secondary p-7">
        

          <Paginate
      postPerPage={5}
      totalPost={25}
      paginate={Paginate}
      />
      </div>
    </>

  );
};

export default RandomKrs;
