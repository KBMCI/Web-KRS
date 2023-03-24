import { Outlet } from "react-router-dom";
import { MatkulProvider } from "../../context/contextMatkul";
import MatkulContent from "./MatkulContent";
function MataKuliah() {
  return (
    <>
      <MatkulContent />
      <Outlet />
    </>
  );
}

export default MataKuliah;
