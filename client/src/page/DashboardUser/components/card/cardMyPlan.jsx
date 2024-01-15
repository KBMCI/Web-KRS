import React from "react";
import { Link } from "react-router-dom";
import LogoMyPlans from "../../../../assets/LogoMyPlans.svg";
import TablePlan from "../../../../component/TablePlan";

const CardMyPlan = ({ firstPlan, isFilled }) => {
  return (
    <>
      <div
        className={`flex justify-center items-center w-full shadow-2xl rounded-[10px] `}
      >
        {isFilled && firstPlan ? (
          <>
            <TablePlan
              data={firstPlan[0].plan}
              dashboardUser={true}
            ></TablePlan>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 py-6">
            <img src={LogoMyPlans} alt="" />
            <p className="w-4/5 neutral-900 text-center font-medium text-base">
              Oops, kamu belum memiliki plan apapun yang tersimpan. Buat satu
              atau lebih agar dapat ditampilkan disini
            </p>
            <button className="bg-secondary border border-primary hover:bg-primary/10 rounded-2xl font-semibold text-base px-6 py-3">
              <Link to="/random-krs">Add Plan</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CardMyPlan;
