import { Outlet } from "react-router-dom";
import { MatkulContext, MatkulProvider } from "../../api/contextMatkul";
import MatkulContent from "./MatkulContent";
import { useContext } from "react";
function MataKuliah() {
  const { open } = useContext(MatkulContext);
  return (
    <MatkulProvider>
      <MatkulContent />
      <Outlet />
    </MatkulProvider>
  );
}

export default MataKuliah;
