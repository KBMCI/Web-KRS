import { FiSearch } from "react-icons/fi";

const FilterTable = () => {
  return (
    <>
      <div className="w-full py-2 px-4 flex align-center gap-x-2 bg-secondary">
        <label htmlFor="">
          <FiSearch className="inline-block" />
        </label>
        <input type="text" placeholder="Search Mata Kuliah" />
      </div>
    </>
  );
};

export default FilterTable;
