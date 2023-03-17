import { Outlet } from "react-router-dom";
import { MatkulContext, MatkulProvider } from "../../api/contextMatkul";
import ContentMatkul from "./ContentMatkul";
import { useContext } from "react";
function MataKuliah() {
  const {open} = useContext(MatkulContext);
  return (
    <MatkulProvider>
      <ContentMatkul open={open} />
      <Outlet />
    </MatkulProvider>
  );
}

export default MataKuliah;
