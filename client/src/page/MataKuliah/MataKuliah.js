import { Outlet } from "react-router-dom";
import {MatkulProvider } from "../../api/contextMatkul";
import MatkulContent from "./MatkulContent";
function MataKuliah() {
  return (
    <MatkulProvider>
      <MatkulContent />
      <Outlet />
    </MatkulProvider>
  );
}

export default MataKuliah;
