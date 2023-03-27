import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function Home() {
  const { open } = useContext(DataContext);
  return (
    <div className="flex min-h-[105vh] font-sans bg-neutral-50">
      <Sidebar />
      <div>
        <div
          className={`${
            open ? "w-4/5" : "w-11/12"
          } fixed bg-neutral-100 right-0 z-10 duration-300  bg-neutral-50`}
        >
          <Navbar />
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
