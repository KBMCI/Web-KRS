import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Sidebar({ items }) {
  const { open, SetOpen } = useContext(DataContext);
  const normalLink =
    "py-3 px-4 mb-2 flex items-center gap-x-4 hover:text-neutral-900 duration-100";
  const activeLink =
    "py-3 px-4 mb-2 flex items-center gap-x-4 bg-primari10 rounded-lg text-black shadow-lg duration-200";

  return (
    <aside
      className={` ${
        open ? "w-1/5 " : "w-1/12 "
      } bg-secondary duration-300 shadow-lg fixed top-0 left-0 bottom-0 z-20 `}
    >
      <div
        className={`${
          open && "pl-8"
        } mt-4 mb-7 flex items-center gap-x-4 cursor-pointer text-primary`}
        onClick={() => SetOpen()}
      >
        <div className={`${!open && "w-full"} flex justify-center`}>
          <img src={Logo} alt={Logo} width="46px" />
        </div>
        <h1
          className={`${
            !open && "hidden"
          } origin-left duration-100 font-bold text-[30px]`}
        >
          <span className="text-black">Sobat</span> KRS
        </h1>
      </div>
      <div className="px-4 font-semibold text-neutral-400">
        {items.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              {item.icon}
              <h1 className={`${!open && "hidden"} origin-left duration-200`}>
                {item.name}
              </h1>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
