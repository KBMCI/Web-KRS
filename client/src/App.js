import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Dashboard from "./page/Dashboard/Dashboard";
import DashboardUser from "./page/DashboardUser/DashboardUser";
import Home from "./page/Home";
import HomeUser from "./page/HomeUser";
import Kelas from "./page/Kelas/Kelas";
import KelasEdit from "./page/Kelas/KelasEdit";
import { KelasTambah } from "./page/Kelas/KelasTambah";
import Login from "./page/LoginRegister/Login";
import Register from "./page/LoginRegister/Register";
import MataKuliah from "./page/MataKuliah/MataKuliah";
import MatkulEdit from "./page/MataKuliah/MatkulEdit";
import MatkulTambah from "./page/MataKuliah/MatkulTambah";
import MyPlan from "./page/MyPlan/MyPlan";
import PlanningKrs from "./page/PlanningKrs/PlanningKrs";
import RandomKrs from "./page/RandomKrs/RandomKrs";
import UserEdit from "./page/UserPanel/UserEdit";
import UserPanel from "./page/UserPanel/UserPanel";
import UserTambah from "./page/UserPanel/UserTambah";
import RequireAuth from "./component/RequireAuth";

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Route User */}
            <Route element={<RequireAuth allowedRole={['user']}/>}>
            <Route path="/" element={<HomeUser />}>
              <Route index element={<DashboardUser />} />
              <Route path="random-krs" element={<RandomKrs />}>
                <Route path="filter" />
              </Route>
              <Route path="planning-krs" element={<PlanningKrs />} />
              <Route path="myplan" element={<MyPlan />} />
            </Route>
            </Route>
            {/* Route Admin */}

            <Route element={<RequireAuth allowedRole={['admin']}/>}>
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
                <Route path=":kode">
                  <Route path="jadwal">
                    <Route path=":kode" element={<KelasEdit />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            </Route>

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
