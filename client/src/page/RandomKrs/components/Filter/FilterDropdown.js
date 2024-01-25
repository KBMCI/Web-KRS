import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Checkbox from "../../../../component/Checkbox";

const FilterDropdown = ({ nama, kelas, kelasChange, selectedKelas }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Nama Mata Kuliah */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="py-3 px-6 w-full flex items-center justify-between font-bold z-10 bg-neutral-10"
      >
        {nama}
        {!isOpen ? <FiChevronDown /> : <FiChevronUp />}
      </button>

      <div
        className={`${
          isOpen
            ? `opacity-100 overflow-visible -translate-y-0  `
            : `opacity-0 overflow-hidden  max-h-0 -translate-y-14   `
        } items-start px-6 w-full bg-neutral-10 space-y-2 transition-all duration-700 `}
      >
        {kelas.map((kls, index) => (
          <div key={index}>
            <Checkbox
              namaKelas={kls.nama}
              namaMatkul={nama}
              id={kls.ID}
              value={`${nama} - ${kls.nama}`}
              onChange={() => kelasChange(`${nama}-${kls.nama}`)}
              checked={selectedKelas.includes(`${nama}-${kls.nama}`)}
              label={"circle"}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterDropdown;
