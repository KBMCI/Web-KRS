import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { MatkulContext } from "../api/contextMatkul";

export function Home() {
  const { open } = useContext(MatkulContext);
  return (
    <div className="flex h-full font-sans ">
      <Sidebar />
      <div>
        <div
          className={`${
            open ? "w-4/5" : "w-11/12" 
          } fixed bg-neutral-100 right-0 z-10 duration-300 bg-neutral-50 `}
        >
          <Navbar />
        </div>
        <div
          className={`${
            open ? "w-4/5" : "w-11/12"
          } duration-300 absolute right-0 top-0 mt-20 min-h-screen bg-neutral-50 `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
