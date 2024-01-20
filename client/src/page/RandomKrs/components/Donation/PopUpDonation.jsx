import React from "react";
import LogoQris from "../../../../assets/qris.png";
import { IoMdClose } from "react-icons/io";

const PopUpDonation = ({ setPopUp, popUp }) => {
  return (
    <div className="flex justify-center align-center fixed inset-0 z-50 bg-black/30 backdrop-blur-sm  h-full w-full  p-32">
      <div className="relative flex flex-col justify-center items-center bg-secondary p-10 gap-4 rounded-xl w-[400px] h-[400px] font-medium">
        <IoMdClose
          size={20}
          className="absolute text-blue z-50 top-3 right-3 cursor-pointer  "
          onClick={() => setPopUp(!popUp)}
        />
        <h1 className="text-center">
          Bantu kami melalui donasi untuk terus mengembangkan
          <span className="font-extrabold"> Sobat KRS</span>, yuk!
        </h1>
        <img src={LogoQris} alt="Logo Qris" className="w-[200px] " />
        <h1 className="text-center">
          Harap cantumkan nama dan feedback pada catatan transfer (opsional)
        </h1>
      </div>
    </div>
  );
};

export default PopUpDonation;
