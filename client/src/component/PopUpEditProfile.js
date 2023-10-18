import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../api/url";
import { DataContext } from "../context/DataContext";

const PopUpEditProfile = () => {
  const { selectedIdMatkul, setSelectedIdMatkul } = useContext(DataContext);
  const navigate = useNavigate();

  const logout = async () => {
    // Membersihkan Random KRS
    try {
      const token = localStorage.getItem("Authorization");
      console.log(token);
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setSelectedIdMatkul([]);

      const response = await url.post("/user/matkul", { matkuls: [] }, config);
      //   Membersihkan localStorage
      localStorage.removeItem("Authorization");
      localStorage.removeItem("role");
      localStorage.removeItem("Temporary_plan");
      navigate("/login");
      console.log("LocalStorage is Empty now");
    } catch (err) {
      console.log(err.message);
      localStorage.removeItem("Authorization");
      localStorage.removeItem("role");
      localStorage.removeItem("Temporary_plan");
      navigate("/login");
    }
  };

  return (
    <div className=" fixed flex justify-end right-0  mr-7 ">
      <ul className=" flex flex-col justify-end items-start bg-neutral-10  list-none p-2 rounded-b-xl  w-fit text-black">
        <li>Edit Profile</li>
        <li onClick={logout} className="cursor-pointer hover:text-accent">
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default PopUpEditProfile;
