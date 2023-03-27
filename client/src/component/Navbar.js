import Breadcrumb from "./Breadcrumb";
import { FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-lg">
      <div className="mr-10 my-4">
        <Breadcrumb />
      </div>
      <div className="flex items-center gap-3">
        <FiUser size={40} className="rounded-full border-2 border-primary"/>
        <div className="cursor-pointer text-end">
          <h1 className="font-bold text-[20px]">Bagas Mahda Dhani</h1>
          <p>215150700111038</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
