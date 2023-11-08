import { useContext, useState } from "react";
import { FiUser } from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import Breadcrumb from "./Breadcrumb";
import PopUpEditProfile from "./PopUpEditProfile";

function Navbar({ items }) {
  const { auth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const profileObject = JSON.parse(localStorage.getItem("Profile"));

  // console.log(auth);
  return (
    <>
      <nav className="flex justify-between items-center px-10 py-4 shadow-lg">
        <div className="mr-10 my-4">
          <Breadcrumb items={items} />
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiUser size={40} className="rounded-full border-2 border-primary" />
          <div className="cursor-pointer text-end">
            <h1 className="font-bold text-[20px]">
              {profileObject.nama} || {profileObject.program_studi}
            </h1>
            <p>{profileObject.nim}</p>
          </div>
        </div>
      </nav>
      {isOpen ? <PopUpEditProfile /> : ""}
    </>
  );
}

export default Navbar;
