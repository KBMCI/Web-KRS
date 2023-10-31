import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { FiCoffee, FiUsers, FiAirplay, FiFolder } from "react-icons/fi";

export function Home() {
  const { open } = useContext(DataContext);
  // Items Navbar
  const itemsNavbar = {
    name: "admin",
    link: "/admin/",
  };
  // Items Sidebar
  const itemsSidebar = [
    {
      name: "Dashboard",
      link: "/admin/",
      icon: <FiFolder size={24} className={`${!open && "w-full"}`} />,
    },
    {
      name: "User Panel",
      link: "/admin/user-panel",
      icon: <FiUsers size={24} className={`${!open && "w-full"}`} />,
    },
    {
      name: "Mata Kuliah",
      link: "/admin/mata-kuliah",
      icon: <FiCoffee size={24} className={`${!open && "w-full"}`} />,
    },
    {
      name: "Kelas",
      link: "/admin/kelas",
      icon: <FiAirplay size={24} className={`${!open && "w-full"}`} />,
    },
  ];

  return (
    <div className="flex min-h-[105vh] font-sans bg-neutral-50">
      <Sidebar items={itemsSidebar} />
      <div>
        <div
          className={`${
            open ? "w-4/5" : "w-11/12"
          } fixed bg-neutral-100 right-0 z-50 duration-300  bg-neutral-50`}
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
}

export default Home;
