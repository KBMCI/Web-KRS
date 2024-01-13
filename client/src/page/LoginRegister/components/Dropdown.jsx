import React, { useEffect, useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { getAllProgramStudi } from "../services/getAllProgramStudi";
import "../styles/animation.css";

const Dropdown = ({ setProgram_studi, required, id_program_studi }) => {
  const [selectedProgramStudi, setSelectedProgramStudi] = useState(
    "Pilih Program Studi"
  );

  const [listProgramStudi, setListProgramStudi] = useState([]);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getAllProgStudi = async () => {
      const response = await getAllProgramStudi();
      setListProgramStudi(response.data.data);
    };
    getAllProgStudi();
  }, []);

  return (
    <>
      <div className="relative ">
        <div
          className={`rounded-xl shadow-lg w-full py-4 pl-4`}
          onClick={() => setIsActive((prev) => !prev)}
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
              {listProgramStudi?.map((item, index) => {
                return (
                  <div
                    className="cursor-pointer "
                    key={index}
                    onClick={(e) => {
                      setSelectedProgramStudi(item.nama);
                      setProgram_studi((prev) => ({
                        ...prev,
                        id_program_studi: item.id,
                      }));
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
