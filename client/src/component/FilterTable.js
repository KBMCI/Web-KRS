import { FiFilter } from "react-icons/fi";

const FilterTable = () => {
  return (
    <>
      <div className="w-full py-3 px-4 flex align-center gap-[10px] bg-secondary">
        <FiFilter size={20} className="inline-block" />
        <h2 className="font-bold">Filter</h2>
      </div>
    </>
  );
};

export default FilterTable;
