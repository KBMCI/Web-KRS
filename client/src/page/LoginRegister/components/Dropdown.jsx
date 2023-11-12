import React, { useEffect, useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { dataProgramStudi } from "../lib/dataProgramStudi";
import "../styles/animation.css";
const Dropdown = ({ setProgram_studi }) => {
  const [selectedProgramStudi, setSelectedProgramStudi] =
    useState("Program Studi");
  const [selectedIDProgStud, setSelectedIDProgStud] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log(isActive);
  }, [isActive]);

  return (
    <>
      <div className="relative ">
        <div
          className={`h-[56px] rounded-xl shadow-lg w-full py-[17px] pl-[16px]  border `}
          onClick={(e) => setIsActive(!isActive)}
          style={{ userSelect: "none" }}
        >
          {selectedProgramStudi}

          <MdOutlineArrowDropDownCircle
            size={24}
            style={{
              transform: isActive ? "rotate(180deg) " : "rotate(0deg)",
            }}
            className={`absolute top-4 right-4 translate-y-3 text-neutral-400 duration-300 ${
              isActive && `text-primary`
            }`}
          />
        </div>

        {isActive && (
          <>
            <div
              className={`rounded-xl shadow-lg py-[17px] px-4 bg-secondary border animation absolute top-[90%] w-full h-fit z-10 `}
            >
              {dataProgramStudi.map((item, index) => {
                return (
                  <div
                    className=" hover:text-accent cursor-pointer "
                    key={index}
                    onClick={(e) => {
                      setSelectedProgramStudi(item.nama);
                      setProgram_studi(item.id);
                      setIsActive(false);
                    }}
                    style={{ userSelect: "none" }}
                  >
                    {item.nama} | {item.fakultas.nama}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dropdown;
