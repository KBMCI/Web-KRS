import axios from "axios";
import React, { useEffect, useState } from "react";
import TablePlan from "./TablePlan";

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
      <TablePlan data={matkul[0]}></TablePlan>
      <TablePlan data={matkul[2]}></TablePlan>
      <TablePlan data={matkul[3]}></TablePlan>
    </>
  );
};

export default RandomKrs;
