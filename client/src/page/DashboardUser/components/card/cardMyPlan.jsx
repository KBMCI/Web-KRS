import React from "react";
import { Link } from "react-router-dom";
import LogoMyPlans from "../../../../assets/LogoMyPlans.svg";
import TablePlan from "../../../../component/TablePlan";

const CardMyPlan = ({ firstPlan, isFilled }) => {
  return (
    <>
      <h1 className=" neutral-900 font-semibold text-2xl  col-span-6">
        My Plans
      </h1>
      <div className="Tabel-My-Plan col-span-4">
        <div
          className={`  flex flex-col justify-center items-center w-full h-full  md:h-[303px] shadow-2xl rounded-[10px]`}
        >
          {isFilled && firstPlan ? (
            <>
              <TablePlan
                data={firstPlan[0].plan}
                dashboardUser={true}
              ></TablePlan>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="mt-[20px]">
                <img className="mb-[10px]" src={LogoMyPlans} alt="" />
              </div>
              <p className="neutral-900 text-center font-medium text-base mx-[10%]">
                Oops, kamu belum memiliki plan apapun yang tersimpan. Buat satu
                atau lebih agar dapat ditampilkan disini
              </p>

              <Link to="/random-krs">
                <button className="bg-accent rounded-[10px] font-semibold text-base px-6 py-3">
                  Add Plan
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardMyPlan;
