import { useContext } from "react";
import Button from "../../component/Button";
import { DataContext } from "../../context/DataContext";
import Count from "../../component/Count";

function DashboardContent() {
  const { dataMatkul, dataKelas, dataUser, link } = useContext(DataContext);
  return (
    <div className="pt-10 px-10">
      <h1 className="text-4xl font-bold mb-12">Dashboard</h1>
      <div className="grid gap-5 grid-cols-2">
        <div className="p-6 border border-gray-200 rounded-lg shadow ">
          <h1 className="font-bold text-3xl text-center mb-3">User Panel</h1>
          <div className="mb-3">
            {
              <Count
                duration="1"
                number={dataUser === null ? 0 : dataUser.length}
              />
            }
            <h1 className="text-center">Jumlah User</h1>
          </div>
          <div className="flex justify-center">
            <Button to={link.admin.user_panel} name="User Panel" />
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow r">
          <h1 className="font-bold text-3xl text-center mb-3">Mata Kuliah</h1>
          <div className="mb-3">
            {
              <Count
                duration="1"
                number={dataMatkul === null ? 0 : dataMatkul.length}
              />
            }
            <h1 className="text-center">Jumlah Mata Kuliah</h1>
          </div>
          <div className="flex justify-center">
            <Button to={link.admin.mata_kuliah} name="Mata Kuliah" />
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow col-span-2 ">
          <h1 className="font-bold text-3xl text-center mb-3">Kelas</h1>
          <div className="mb-3">
            {
              <Count
                duration="1"
                number={dataKelas === null ? 0 : dataKelas.length}
              />
            }
            <h1 className="text-center">Jumlah Kelas</h1>
          </div>
          <div className="flex justify-center">
            <Button to={link.admin.kelas} name="Kelas" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
