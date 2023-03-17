import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserPanel from "./page/UserPanel/UserPanel";
import Kelas from "./page/Kelas/Kelas";
import MataKuliah from "./page/MataKuliah/MataKuliah";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard/Dashboard";
import MatkulTambah from "./page/MataKuliah/MatkulTambah";
import MatkulEdit from "./page/MataKuliah/MatkulEdit";
import { MatkulProvider } from "./api/contextMatkul";

function App() {
  return (
    <MatkulProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="user-panel" element={<UserPanel />} />
            <Route path="mata-kuliah" element={<MataKuliah />}>
              <Route path="tambah" element={<MatkulTambah />} />
              <Route path=":kode" element={<MatkulEdit />} />
            </Route>
            <Route path="kelas" element={<Kelas />} />
          </Route>
        </Routes>
      </div>
    </MatkulProvider>
  );
}

export default App;
