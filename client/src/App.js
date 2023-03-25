import "./App.css";
import { Route, Routes, Link} from "react-router-dom";
import UserPanel from "./page/UserPanel/UserPanel";
import Kelas from "./page/Kelas/Kelas";
import MataKuliah from "./page/MataKuliah/MataKuliah";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard/Dashboard";
import MatkulTambah from "./page/MataKuliah/MatkulTambah";
import MatkulEdit from "./page/MataKuliah/MatkulEdit";
import { DataProvider } from "./context/DataContext";
import { KelasTambah } from "./page/Kelas/KelasTambah";
import KelasEdit from "./page/Kelas/KelasEdit";
import UserEdit from "./page/UserPanel/UserEdit";
import UserTambah from "./page/UserPanel/UserTambah";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              index
              element={<Dashboard />}
              handle={{
                crumb: () => <Link to="/">Dashboard</Link>,
              }}
            />
            <Route path="user-panel" element={<UserPanel />} >
            <Route path="tambah" element={<UserTambah />} />
              <Route path=":kode" element={<UserEdit />} />
            </Route>
            <Route path="mata-kuliah" element={<MataKuliah />}>
              <Route path="tambah" element={<MatkulTambah />} />
              <Route path=":kode" element={<MatkulEdit />} />
            </Route>
            <Route path="kelas" element={<Kelas />}>
              <Route path="tambah" element={<KelasTambah />} />
              <Route path=":kode" element={<KelasEdit />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
