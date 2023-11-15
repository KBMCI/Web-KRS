import { Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./component/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import PlanProvider from "./context/PlanContext";
import Login from "./page/LoginRegister/Login";
import Register from "./page/LoginRegister/Register";

import PageLoading from "./component/loader/PageLoading";

// Admin
import Home from "./page/admin/page/Home";
const MatkulAdd = lazy(() => wait(1000).then(() => import("./page/admin/features/mataKuliah/components/MatkulAdd")));
const MatkulEdit = lazy(() => wait(1000).then(() => import("./page/admin/features/mataKuliah/components/MatkulEdit")));
const MataKuliah = lazy(() => wait(1000).then(() => import("./page/admin/page/MataKuliah")));

const KelasAdd = lazy(() => wait(1000).then(() => import("./page/admin/features/kelas/components/KelasAdd")));
const KelasEdit = lazy(() => wait(1000).then(() => import("./page/admin/features/kelas/components/KelasEdit")));
const Kelas = lazy(() => wait(1000).then(() => import("./page/admin/page/Kelas")));

const FakultasAdd = lazy(() => wait(1000).then(() => import("./page/admin/features/fakultas/components/FakultasAdd")));
const FakultasEdit = lazy(() => wait(1000).then(() => import("./page/admin/features/fakultas/components/FakultasEdit")));
const Fakultas = lazy(() => wait(1000).then(() => import("./page/admin/page/Fakultas")));

const ProgramStudiAdd = lazy(() => wait(1000).then(() => import("./page/admin/features/programStudi/components/ProgramStudiAdd")));
const ProgramStudiEdit = lazy(() => wait(1000).then(() => import("./page/admin/features/programStudi/components/ProgramStudiEdit")));
const ProgramStudi = lazy(() => wait(1000).then(() => import("./page/admin/page/ProgramStudi")));

const UserAddAdmin = lazy(() => wait(1000).then(() => import("./page/admin/features/user/components/UserAddAdmin")));
const UserEdit = lazy(() => wait(1000).then(() => import("./page/admin/features/user/components/UserEdit")));
const User = lazy(() => wait(1000).then(() => import("./page/admin/page/User")));

const Dashboard = lazy(() => wait(1000).then(() => import("./page/admin/page/Dashboard")));

// User Page
const HomeUser = lazy(() => wait(1000).then(() => import("./page/HomeUser")));
const DashboardUser = lazy(() => wait(1000).then(() => import("./page/DashboardUser/DashboardUser")));
const RandomKrs = lazy(() => wait(1000).then(() => import("./page/RandomKrs/RandomKrs")));
const PlanningKrs = lazy(() => wait(1000).then(() => import("./page/PlanningKrs/features/PlanningKrs")));
const MyPlan = lazy(() => wait(1000).then(() => import("./page/MyPlan/MyPlan")));

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <PlanProvider>
          <div className="App">
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Route User */}
              <Route element={<RequireAuth allowedRole={["user", "admin"]} />}>
                <Route path="/" element={<HomeUser />}>
                  <Route element={<SuspenseWrapper />}>
                    <Route index element={<DashboardUser />} />
                    <Route path="random-krs" element={<RandomKrs />}>
                      <Route path="filter" />
                    </Route>
                    <Route path="planning-krs" element={<PlanningKrs />} />
                    <Route path="myplan" element={<MyPlan />} />
                  </Route>
                </Route>
              </Route>

              {/* Route Admin */}
              <Route element={<RequireAuth allowedRole={["admin"]} />}>
                <Route path="/admin" element={<Home />}>
                  <Route index element={<Dashboard />} />
                  <Route element={<SuspenseWrapper />}>
                    <Route path="user-panel" element={<User />}>
                      <Route path="tambah" element={<UserAddAdmin />} />
                      <Route path=":kode" element={<UserEdit />} />
                    </Route>
                    <Route path="mata-kuliah" element={<MataKuliah />}>
                      <Route path="tambah" element={<MatkulAdd />} />
                      <Route path=":kode" element={<MatkulEdit />} />
                    </Route>
                    <Route path="fakultas" element={<Fakultas />}>
                      <Route path="tambah" element={<FakultasAdd />} />
                      <Route path=":kode" element={<FakultasEdit />} />
                    </Route>
                    <Route path="program-studi" element={<ProgramStudi />}>
                      <Route path="tambah" element={<ProgramStudiAdd />} />
                      <Route path=":kode" element={<ProgramStudiEdit />} />
                    </Route>
                    <Route path="kelas" element={<Kelas />}>
                      <Route path="tambah" element={<KelasAdd />} />
                      <Route path=":kode">
                        <Route path="jadwal">
                          <Route path=":kode" element={<KelasEdit />} />
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </div>
        </PlanProvider>
      </AuthProvider>
    </DataProvider>
  );
}


const SuspenseWrapper = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Outlet />
    </Suspense>
  );
};

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};


export default App;
