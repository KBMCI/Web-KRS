import React from "react";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

const CardPlanning = () => {
  return (
    <div className="bg-secondary shadow-2xl rounded-xl h-full flex justify-center">
      <div className="flex flex-col gap-4 justify-center items-center w-3/4 h-full">
        <div>
          <FiFileText size={75} color="#4071F0" />
        </div>
        <h1 className="neutral-900 font-bold text-2xl text-center">
          Planning KRS
        </h1>
        <p className="neutral-900 text-center">
          merupakan fitur yang dibuat untuk anda melakukan perencanaan Kartu
          Rencana Semester. Akan disediakan banyak mata kuliah yang dapat Anda
          pilih nantinya.
        </p>
        <button className="bg-secondary border border-primary hover:bg-primary/10 rounded-2xl font-semibold text-base px-6 py-3 ">
          <Link to="/planning-krs">Coba</Link>
        </button>
      </div>
    </div>
  );
};

export default CardPlanning;
