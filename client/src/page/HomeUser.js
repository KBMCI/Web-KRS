import { useContext } from "react";
import { FiAirplay, FiCoffee, FiFolder, FiUsers } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { DataContext } from "../context/DataContext";

const HomeUser = () => {
  const { open } = useContext(DataContext);
  // Items Navbar
  const itemsNavbar = {
    name: "user",
    link: "/",
  };

  // Items Sidebar
  const itemsSidebar = [
    {
      name: "Dashboard",
      link: "/",
      icon: <FiFolder size={24} className={`${!open && "w-full"}`} />,
    },
    {
      name: "Random KRS",
      link: "/random-krs",
      icon: <FiUsers size={24} className={`${!open && "w-full"}`} />,
    },
    {
      name: "Planning KRS",
      link: "/planning-krs",
      icon: <FiCoffee size={24} className={`${!open && "w-full"}`} />,
    },
    {
      name: "My Plan",
      link: "/myplan",
      icon: <FiAirplay size={24} className={`${!open && "w-full"}`} />,
    },
  ];

  return (
    <div className="flex min-h-screen font-sans bg-neutral-50">
      <Sidebar items={itemsSidebar} />
      <div>
        <div
          className={`${
            open ? "w-4/5" : "w-11/12"
          } fixed bg-neutral-100 right-0 z-10 duration-300  bg-neutral-50`}
        >
          <Navbar items={itemsNavbar} />
        </div>
        <div
          className={`${
            open ? "w-4/5" : "w-11/12"
          } duration-300 absolute right-0 top-0 pt-[6rem] bg-neutral-50`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
