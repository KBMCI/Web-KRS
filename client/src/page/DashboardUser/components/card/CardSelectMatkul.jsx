import React, { useState } from "react";
import LogoSearch from "../../../../assets/LogoSearch.svg";
import MatkulCheckbox from "../checkbox/MatkulCheckbox";

const CardSelectMatkul = ({ onPostHandle, namaMataKuliahTabel }) => {
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
  const barisTabel = () => {
    return "h-[51.13px] min-h-[51.13px] py-[10px] px-4 font-semibold text-base";
  };
  return (
    <>
      {" "}
      <h1 className="neutral-900 font-semibold text-2xl  p-[10px] col-span-6 ">
        Mata Kuliah Dipilih
      </h1>
      <div className="Tabel-Mata-Kuliah  col-span-4">
        <div className="w-full shadow-lg  rounded-[10px] mb-[10px] h-[451px] max-h-[451px] overflow-y-scroll scrollbar scrollbar-thumb-neutral-400 scrollbar-w-1 scrollbar-thumb-rounded-lg">
          <table className="table-auto border-collapse border-b border-neutral-400 w-full drop-shadow-xl ">
            <thead className="">
              <tr className="bg-primary text-secondary sticky top-0">
                <th className="px-4 py-[10px] w-[47px] h-[42px]"></th>
                <th className="pl-[16px] pr-[21px] py-[10px] h-[42px] w-[101px]">
                  Kode MK
                </th>
                <th className="px-[16px] py-[10px] h-[42px] w-[335px] text-left">
                  Nama Mata Kuliah
                </th>
                <th className="h-[42px] w-[235px] p-2">
                  <div className="flex justify-center items-center gap-2">
                    <div>
                      <img src={LogoSearch} alt="" width="30" />
                    </div>

                    <input
                      type="text"
                      onChange={(e) => setQuery(e.target.value)}
                      className="bg-primary border-none rounded-3xl text-[15px] text-secondary  py-[4px] px-3 border-2  focus:border-neutral-50 primary placeholder:text-secondary placeholder:text-[13px]  font-semibold w-[300px] ...  focus:outline-non focus:outline-neutral-10 transition duration-300 "
                      placeholder="Search Mata Kuliah"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems &&
                filteredItems.map((matkul, index) => (
                  <tr
                    key={index}
                    className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                  >
                    <td className="px-4 py-[10px] w-[47px] h-[51.13]">
                      <MatkulCheckbox
                        namaMatkul={matkul.nama}
                        id={matkul.id}
                        index={index}
                        AllMatkul={matkul}
                      />
                    </td>
                    <td
                      className={`${barisTabel()} py-[10px] px-4 font-semibold w-[101px]`}
                    >
                      {matkul.kode_matkul}
                    </td>
                    <td
                      className={`${barisTabel()} py-[10px] px-4 font-semibold w-[335px]`}
                    >
                      {matkul.nama}
                    </td>
                    <td
                      className={`${barisTabel()} py-[10px] px-4 font-semibold w-[335px]`}
                    ></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-end text-secondary">
          <button className="bg-primary rounded-xl p-2" onClick={onPostHandle}>
            Simpan
          </button>
        </div>
      </div>
    </>
  );
};

export default CardSelectMatkul;
