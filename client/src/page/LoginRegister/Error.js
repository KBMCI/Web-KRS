import React from 'react';
import False from "../../assets/False.svg";

const Error = ({ errmsg }) => {
  return (
    <div className=" z-50 bottom-10 right-10 fixed flex justify-end items-end h-screen ">
      <div className=" bg-error rounded-2xl text-secondary font-mulis p-4 flex flex-row justify-center items-center w-[370px]">
        <div className="basis-[15%]">
          <img src={False} alt='' width="40"></img>
        </div>
        <div className="basis-[85%]">
          <h1 className="font-bold text-xl">Oops!</h1>
          <p>{errmsg}</p>
        </div>
      </div>
    </div>
  );
}

export default Error