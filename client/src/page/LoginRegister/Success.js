import React from "react";
import True from "../../assets/True.svg";

const Success = (props) => {
  return (
    <div
      className={` z-50 bottom-10 right-10 fixed flex justify-end items-end h-screen  .... ${
        props.isOpen ? `-translate-x-0` : `right-[-100%] `
      }  duration-500 transition-all`}
    >
      <div className=" bg-success rounded-2xl text-secondary font-mulis p-4 flex flex-row justify-center items-center w-[370px]">
        <div className="basis-[15%]">
          <img
            src={True}
            alt=""
            className={`${
              props.isOpen ? `scale-125` : `scale-0`
            } duration-[2000ms] transition-all `}
            width="40"
          ></img>
        </div>
        <div className="basis-[85%]">
          <h1 className={`font-bold text-xl`}>Yippie!</h1>
          <p>
            {props.for} berhasil. {props.messages}.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
