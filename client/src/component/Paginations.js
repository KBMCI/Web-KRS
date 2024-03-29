import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

const Paginations = ({ data, itemsPerPage, setCurrentPage, currentPage }) => {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const pages = [];
  if ( data === null ) {
    pages.push(1)
  } else {
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pages.push(i);
    }
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "bg-primary text-secondary w-[29px] h-[29px] font-bold text-center rounded-full leading-[29px]"
              : "text-center leading-[29px]  "
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleListNextNumber = () => {
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  };

  const handleListPrevNumber = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      handleListNextNumber();
    }
  };

  const handleNextUpbtn = () => {
    if (currentPage === minPageNumberLimit + 1) {
      setCurrentPage(currentPage + pageNumberLimit);
      handleListNextNumber();
    } else {
      setCurrentPage(maxPageNumberLimit + 1);
      handleListNextNumber();
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      handleListPrevNumber();
    }
  };

  const handlePrevUpbtn = () => {
    if (currentPage === minPageNumberLimit + 1) {
      setCurrentPage(currentPage - pageNumberLimit);
      handleListPrevNumber();
    } else {
      setCurrentPage(Math.abs(minPageNumberLimit - pageNumberLimit + 1));
      handleListPrevNumber();
    }
  };

  return (
    <>
      <div className="cursor-pointer ">
        <ul className="py-2 text-primary font-bold text-[12px] border-t border-neutral-400 flex justify-center gap-7 items-center">
          <li className={`flex gap-8`}>
            <button
              onClick={handlePrevUpbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              <FiChevronsLeft />
            </button>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              <FiChevronLeft />
            </button>
          </li>
          {renderPageNumbers}
          <li className="flex gap-8">
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              <FiChevronRight />
            </button>
            <button
              onClick={handleNextUpbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              <FiChevronsRight />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Paginations;
