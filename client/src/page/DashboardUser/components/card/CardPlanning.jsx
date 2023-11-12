import React from "react";
import { Link } from "react-router-dom";
import LogoPlanning from "../../../../assets/LogoPlanning.svg";

const CardPlanning = () => {
  return (
    <>
      <div className="Card-Planning  col-span-2">
        <div className="flex-col">
          <div className="bg-secondary h-[451px] w-[337px] flex flex-col justify-center items-center shadow-2xl rounded-xl p-5 ">
            <div className="">
              <div className=" flex justify-center items-center">
                <img
                  src={LogoPlanning}
                  width={75}
                  height={75}
                  alt="Planning KRS"
                />
              </div>
              <div>
                <h1 className="neutral-900 font-bold text-2xl text-center p-[10px]">
                  Planning KRS
                </h1>
                <p className="neutral-900 text-center p-[10px]">
                  merupakan fitur yang dibuat untuk anda melakukan perencanaan
                  Kartu Rencana Semester. Akan disediakan banyak mata kuliah
                  yang dapat Anda pilih nantinya.
                </p>
              </div>
            </div>
            <Link to="/planning-krs">
              <button className="bg-accent rounded-[10px] font-semibold text-base px-6 py-3 ">
                Coba
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPlanning;
