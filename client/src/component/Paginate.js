import { useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export default function Paginate({
  postPerPage,
  totalPost,
  paginate,
  previousPage,
  nextPage,
}) {
  const pageNumber = [];
  const [curr, setCurr] = useState(1);
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination-container">
      <ul className="flex justify-center gap-7 items-center">
        <li
          onClick={() => {
            previousPage();
            if (curr !== 1) {
              setCurr(curr - 1);
            }
          }}
          className={`cursor-pointer ${curr === 1 && "text-neutral-400"} `}
        >
          <FiChevronLeft />
        </li>
        {pageNumber.map((number) => {
          return (
            <li
              key={number}
              className={`cursor-pointer text-[12px] flex items-center justify-center ${
                curr === number &&
                "bg-secondary text-primary w-[25px] h-[25px] text-center rounded-full font-bold"
              }`}
              onClick={() => {
                paginate(number);
                setCurr(number);
              }}
            >
              {number}
            </li>
          );
        })}
        <li
          onClick={() => {
            nextPage();
            if (curr !== Math.ceil(totalPost / postPerPage)) {
              setCurr(curr + 1);
            }
          }}
          className={`cursor-pointer ${
            curr === Math.ceil(totalPost / postPerPage) && "text-neutral-400"
          }`}
        >
          <FiChevronRight />
        </li>
      </ul>
    </div>
  );
}
