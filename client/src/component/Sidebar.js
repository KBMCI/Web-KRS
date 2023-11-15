import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

function Sidebar({ items }) {
  const { open, SetOpen } = useContext(DataContext);
  const navigate = useNavigate();
  const logout = async () => {
    // Membersihkan Random KRS
    try {
      //   Membersihkan localStorage
      localStorage.removeItem("Authorization");
      localStorage.removeItem("role");
      localStorage.removeItem("Profile");
      // localStorage.removeItem("Temporary_plan");
      navigate("/login");
      // console.log("LocalStorage is Empty now");
    } catch (err) {
      console.log(err.message);
    }
  };
  const normalLink =
    "py-3 px-4 mb-2 flex items-center gap-x-4 hover:text-neutral-900 duration-100";
  const activeLink =
    "py-3 px-4 mb-2 flex items-center gap-x-4 bg-primari10 rounded-lg text-black shadow-lg duration-200";

  return (
    <aside
      className={` ${
        open ? "w-1/5 " : "w-1/12 "
      } bg-secondary duration-100 shadow-lg fixed h-full z-20 `}
    >
      {/* LOGO */}
      <div
        className={`${
          open && "pl-8"
        } mt-4 mb-7 flex items-center gap-x-4 cursor-pointer text-primary`}
        onClick={() => SetOpen()}
      >
        <div className={`${!open && "w-full"} flex justify-center `}>
          {/* <img src={Logo} alt={Logo} width="46px" /> */}
          <RxHamburgerMenu size={25} />
        </div>
        {/* <div className="flex flex-row justify-center items-center "> */}
        <h1
          className={`${
            !open && "hidden"
          } origin-left duration-100 font-bold text-[30px] flex flex-row gap-1  items-center`}
        >
          {/* <img
            src={Logo}
            alt="logo"
            width="46px"
            className={`${!open && "hidden"}`}
          /> */}
          <span className="text-black">Sobat</span> KRS
        </h1>
        {/* </div> */}
      </div>

      {/* Navigasi */}
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
      <div
        className=" py-3 px-8   text-neutral-400 cursor-pointer hover:text-neutral-900 duration-100 gap-x-4 flex flex-row"
        onClick={logout}
      >
        <FiLogOut size={24} className={`${!open && "w-full"}`} />
        <h1 className={`${!open && "hidden"} origin-left duration-200 `}>
          Log Out
        </h1>
      </div>
    </aside>
  );
}

export default Sidebar;
