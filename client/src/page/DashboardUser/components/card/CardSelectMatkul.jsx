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
        <div className="w-full flex justify-center bg-primary text-secondary font-semibold sticky top-0 left-0 right-0 rounded-t-xl">
          <p className="w-[5%]"></p>
          <p className="w-[20%] flex items-center">Kode MK</p>
          <p className="w-[45%] b border-secondary flex items-center">
            Nama Mata Kuliah
          </p>
          <div className="w-[30%]">
            <div className="flex items-center gap-2 px-2 border-l-[1px] py-2 border-secondary">
              <FiSearch size={24} />
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                className="bg-primary rounded-2xl text-[14px] text-secondary px-3 border-1 border-neutral-50 primary placeholder:text-secondary font-semibold focus:border-neutral-200 w-full"
                placeholder="Search Mata Kuliah"
              />
            </div>
          </div>
        </div>
        <div className="bg-secondary h-96 w-full max-h-96 overflow-y-scroll scrollbar scrollbar-thumb-neutral-400 scrollbar-w-1 scrollbar-thumb-rounded-lg rounded-b-xl">
          {filteredItems &&
            filteredItems.map((matkul, index) => (
              <label
                key={index}
                className="bg-secondary text-neutral-900 border-b border-neutral-400 flex py-4 w-full font-semibold cursor-pointer hover:bg-neutral-50 transition-colors"
                htmlFor={matkul.id}
              >
                <div className="w-[5%] flex justify-center items-center">
                  <MatkulCheckbox
                    namaMatkul={matkul.nama}
                    id={matkul.id}
                    index={index}
                    AllMatkul={matkul}
                  />
                </div>
                <div className="w-[95%] flex">
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
