import { useContext } from "react";
import Breadcrumb from "./Breadcrumb";
import { FiUser } from "react-icons/fi";
import AuthContext from "../context/AuthContext";

function Navbar({items}) {
  const { auth } = useContext(AuthContext)
  console.log(auth)
  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-lg">
      <div className="mr-10 my-4">
        <Breadcrumb items={items}/>
      </div>
      <div className="flex items-center gap-3">
        <FiUser size={40} className="rounded-full border-2 border-primary"/>
        <div className="cursor-pointer text-end">
          <h1 className="font-bold text-[20px]">{auth.nama}</h1>
          <p>{auth.nim}</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
