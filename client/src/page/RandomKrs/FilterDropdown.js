import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Checkbox from "../../component/Checkbox";

const FilterDropdown = ({ nama, kelas, kelasChange, selectedKelas }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* adsis */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="py-3 px-6 w-full flex items-center justify-between font-bold"
      >
        {nama}
        {!isOpen ? <FiChevronDown /> : <FiChevronUp />}
      </button>

      {isOpen && (
        <div className="flex flex-col items-start px-6 w-full">
          {kelas.map((kls) => (
            <div className="flex w-full justify-between" key={kls.ID}>
              <label className="font-semibold py-3">{kls.nama}</label>
              <Checkbox
                value={`${nama}-${kls.nama}`}
                onChange={() => kelasChange(`${nama}-${kls.nama}`)}
                checked={selectedKelas.includes(`${nama}-${kls.nama}`)}
                label={'circle'}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterDropdown;
