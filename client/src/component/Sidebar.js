import { NavLink } from "react-router-dom";
import {
  FiActivity,
  FiCoffee,
  FiUsers,
  FiAirplay,
  FiDatabase,
} from "react-icons/fi";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Sidebar() {
  const { open, SetOpen } = useContext(DataContext);
  const normalLink =
    "py-3 px-4 mb-2 flex items-center gap-x-4 hover:text-neutral-900 duration-100";
  const activeLink =
    "py-3 px-4 mb-2 flex items-center gap-x-4 bg-primari10 rounded-lg text-black shadow-lg duration-200";

  return (
    <aside
      className={` ${
        open ? "w-1/5 " : "w-1/12 text-primary"
      } bg-secondary duration-300 shadow-lg fixed top-0 left-0 bottom-0 z-20 `}
    >
      <div
        className="mt-4 px-8 mb-7 flex items-center gap-x-4 cursor-pointer"
        onClick={() => SetOpen()}
      >
        <FiActivity size={46} className={`${!open && "w-full"}`} />
        <h1
          className={`${
            !open && "hidden"
          } origin-left duration-100 font-bold text-[30px]`}
        >
          <span className="text-primary">Sobat</span> KRS
        </h1>
      </div>
      <div className="px-4 font-semibold text-neutral-400">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <FiDatabase size={24} className={`${!open && "w-full"}`} />{" "}
          <h1 className={`${!open && "hidden"} origin-left duration-100`}>
            Dashboard
          </h1>
        </NavLink>
        <NavLink
          to="/user-panel"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <FiAirplay size={24} className={`${!open && "w-full"}`} />{" "}
          <h1 className={`${!open && "hidden"} origin-left duration-100`}>
            User Panel
          </h1>
        </NavLink>
        <NavLink
          to="/mata-kuliah"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <FiCoffee size={24} className={!open && "w-full "} />{" "}
          <h1 className={`${!open && "hidden"} origin-left duration-200`}>
            Mata Kuliah
          </h1>
        </NavLink>
        <NavLink
          to="/kelas"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <FiUsers size={24} className={!open && "w-full"} />{" "}
          <h1 className={`${!open && "hidden"} origin-left duration-200`}>
            Kelas
          </h1>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
