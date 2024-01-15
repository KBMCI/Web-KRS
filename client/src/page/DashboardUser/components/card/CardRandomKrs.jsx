import React from "react";
import { Link } from "react-router-dom";
import LogoRandom from "../../../../assets/LogoRandom.svg";

const CardRandomKrs = () => {
  return (
    <div className="bg-secondary shadow-2xl rounded-xl h-full flex justify-center">
      <div className="flex flex-col gap-4 justify-center items-center w-3/4 h-full">
        <div>
          <img src={LogoRandom} alt="Random KRS" />
        </div>
        <h1 className="neutral-900 font-bold text-2xl text-center">
          Random KRS
        </h1>
        <p className="neutral-900 text-center">
          dengan random krs sistem akan memberikan jadwal yang tersedia dengan
          acak
        </p>
        <button className="bg-secondary border border-primary hover:bg-primary/10 rounded-2xl font-semibold text-base px-6 py-3 ">
          <Link to="/random-krs">Coba</Link>
        </button>
      </div>
    </div>
  );
};

export default CardRandomKrs;
