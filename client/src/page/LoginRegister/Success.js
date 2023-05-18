import React from "react";
import True from "../../assets/True.svg"

const Success = () => {
  return (
    <div className=" z-50 bottom-10 right-10 fixed flex justify-end items-end h-screen ">
      <div className=" bg-success rounded-2xl text-secondary font-mulis p-4 flex flex-row justify-center items-center w-[370px]">
        <div className="basis-[15%]">
         <img src={True} alt='' width="40"></img>
        </div>
        <div className="basis-[85%]">
        <h1 className="font-bold text-xl">Yippie!</h1>
        <p>Login berhasil. Selamat datang, Sobat. </p>   
        </div>
        

      </div>
    </div>
  );
};

export default Success;
