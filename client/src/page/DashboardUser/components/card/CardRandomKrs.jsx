import React from "react";
import { Link } from "react-router-dom";
import LogoRandom from "../../../../assets/LogoRandom.svg";

const CardRandomKrs = () => {
  return (
    <div className="Card-Random-KRS col-span-2">
      <div className="bg-secondary h-full w-[337px] flex flex-col items-center shadow-2xl rounded-xl p-5 justify-center">
        <div className="flex justify-center items-center">
          <img className="" src={LogoRandom} alt="Random KRS" />
        </div>
        <div>
          <h1 className="neutral-900 font-bold text-2xl text-center p-[10px]">
            Random KRS
          </h1>
          <p className="neutral-900 text-center p-[10px] mx-[22.5px] mb-[8px]">
            dengan random krs sistem akan memberikan jadwal yang tersedia dengan
            acak
          </p>
        </div>
        <Link to="/random-krs">
          <button className="bg-accent rounded-[10px] font-semibold text-base px-6 py-3">
            Coba
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardRandomKrs;
