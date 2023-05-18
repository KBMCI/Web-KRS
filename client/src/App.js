import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import HomeUser from "./page/HomeUser";
import DashboardUser from "./page/DashboardUser/DashboardUser";
import RandomKrs from "./page/RandomKrs/RandomKrs";
import PlanningKrs from "./page/PlanningKrs/PlanningKrs";
import MyPlan from "./page/MyPlan/MyPlan";
import { AuthProvider } from "./context/AuthContext";
import Login from "./page/LoginRegister/Login";
import Register from "./page/LoginRegister/Register";

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Route User */}
            <Route path="/" element={<HomeUser />}>
              <Route index element={<DashboardUser />} />
              <Route path="random-krs" element={<RandomKrs />}>
                <Route path="filter" />
              </Route>
              <Route path="planning-krs" element={<PlanningKrs />} />
              <Route path="myplan" element={<MyPlan />} />
            </Route>
            {/* Route Admin */}
            <Route path="/admin" element={<Home />}>
              <Route index element={<Dashboard />} />
              <Route path="user-panel" element={<UserPanel />}>
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
              <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          </Routes>
        </div>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
