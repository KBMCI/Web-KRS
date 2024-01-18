import React from "react";
import { Link } from "react-router-dom";
import { FiClipboard } from "react-icons/fi";

const CardRandomKrs = () => {
  return (
    <div className="bg-secondary shadow-2xl rounded-[15px] h-full flex justify-center">
      <div className="flex flex-col gap-[14px] justify-center items-center w-3/4 h-full">
        <div>
          <FiClipboard size={75} color="#4071F0" />
        </div>
        <h1 className="neutral-900 font-bold text-2xl text-center">
          Random KRS
        </h1>
        <p className="neutral-900 text-center">
          Memberikan jadwal yang tersedia dengan acak
        </p>
        <Link to="/random-krs">
          <button className="bg-secondary border border-primary hover:bg-primary/10 rounded-2xl font-semibold text-base px-8 py-2 ">
            Coba
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardRandomKrs;
