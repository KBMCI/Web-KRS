import React, { useState } from "react";
import LogoSearch from "../../../../assets/LogoSearch.svg";
import MatkulCheckbox from "../checkbox/MatkulCheckbox";
import { FiSave, FiSearch } from "react-icons/fi";
import Button from "../../../../component/button/Button";

const CardSelectMatkul = ({ onPostHandle, namaMataKuliahTabel, loading }) => {
  const [query, setQuery] = useState("");

  // Logic for Search Bar
  const getFilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((matkul) =>
      matkul.nama.toLowerCase().includes(query.toLowerCase())
    );
  };

  // filter
  const filteredItems = getFilteredItems(query, namaMataKuliahTabel);

  return (
    <>
      <div className="drop-shadow-2xl relative">
        <div className="w-full flex justify-center bg-primary text-secondary border-b-2 border-primary overflow-hidden font-semibold sticky top-0 left-0 right-0 rounded-t-[15px]">
          <p className="w-[8%] text-[14px]"></p>
          <p className="w-[20%] flex items-center text-[14px]">Kode MK</p>
          <p className="w-[45%] border-secondary flex items-center text-[14px]">
            Nama Mata Kuliah
          </p>
          <div className="w-[30%]">
            <div className="flex items-center px-2 bg-secondary">
              <FiSearch size={22} color="#4071F0" />
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                className="text-[14px] text-primary border-none focus:ring-0 focus:outline-none placeholder:text-primary font-semibold w-full py-2 px-1"
                placeholder="Search Mata Kuliah"
              />
            </div>
          </div>
        </div>
        <div className="bg-secondary h-[19rem] w-full max-h-[19rem] overflow-y-scroll scrollbar scrollbar-thumb-neutral-400 scrollbar-w-1 scrollbar-thumb-rounded-lg rounded-b-[15px]">
          {filteredItems &&
            filteredItems.map((matkul, index) => (
              <label
                key={index}
                className="bg-secondary text-neutral-900 border-b border-neutral-400 flex py-2 w-full font-semibold cursor-pointer hover:bg-neutral-50 transition-colors"
                htmlFor={matkul.id}
              >
                <div className="w-[8%] flex justify-center items-center">
                  <MatkulCheckbox
                    namaMatkul={matkul.nama}
                    id={matkul.id}
                    index={index}
                    AllMatkul={matkul}
                  />
                </div>
                <div className="w-[95%] flex text-[14px]">
                  <p className="w-[21.5%]">{matkul.kode_matkul}</p>
                  <p className="w-[80%]">{matkul.nama}</p>
                </div>
              </label>
            ))}
        </div>
        <div className="absolute bottom-3 right-3">
          <Button
            icon={<FiSave color="#FFFFFF" size={18} />}
            className={`bg-primary rounded-full text-secondary w-24 h-10`}
            onClick={onPostHandle}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardSelectMatkul;
