import React from "react";
import { Link } from "react-router-dom";
import { FiInbox } from "react-icons/fi";

const CardPlanning = () => {
  return (
    <div className="bg-secondary shadow-2xl rounded-[15px] h-full flex justify-center py-2">
      <div className="flex flex-col gap-[14px] justify-center items-center w-3/4 h-full">
        <div>
          <FiInbox size={75} color="#4071F0" />
        </div>
        <h1 className="neutral-900 font-bold text-2xl text-center">
          Planning KRS
        </h1>
        <p className="neutral-900 text-center">
          Melakukan perencanaan Kartu Rencana Semester. Akan disediakan banyak
          mata kuliah yang dapat Anda pilih nantinya.
        </p>
        <Link to="/planning-krs">
          <button className="bg-secondary border border-primary hover:bg-primary/10 rounded-2xl font-semibold  px-8 py-2  ">
            Coba
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardPlanning;
